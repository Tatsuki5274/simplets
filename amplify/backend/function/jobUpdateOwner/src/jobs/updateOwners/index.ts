import { EventType } from "index";
import AWS from "aws-sdk";
import {
  listEmployeesCompany,
  listReportsCompanyDate,
  listSheets,
} from "../../graphql/queries";
import Apply from "./Apply";
import GetPermission from "./GetPermission";
import {
  Objective,
  Report,
  Section,
  Sheet,
  UpdateOwnerResponseType,
} from "../../API";
import { EmployeeDao } from "../../libs/dao/employeeDao";
import { SheetDao } from "../../libs/dao/sheetDao";
import { ReportDao } from "../../libs/dao/reportDao";
import { CustomDao } from "libs/dao/customDao";

export default async function UpdateOwners(
  companyId: string,
  email: string
): Promise<UpdateOwnerResponseType> {
  // const companyId =
  //   typeof claims["custom:companyId"] === "string"
  //     ? claims["custom:companyId"]
  //     : null;
  // if (!companyId) {
  //   // 会社番号が登録されていない場合
  //   throw new Error("CompanyID is not set");
  // }
  // セルフタイムアウトの設置
  setTimeout(async () => {
    // リクエストの失敗を通知する
    AWS.config.update({ region: "us-east-1" });
    const ses = new AWS.SES();
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: `
社員情報の更新に失敗しました。
simplets_desk@sisco-consulting.co.jpまでご連絡をお願いいたします。`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "「Simplet's」社員管理 変更結果のお知らせ",
        },
      },
      Source: "simplets_desk@simplets.jp" /* required */,
    };
    await ses.sendEmail(params).promise();
    throw new Error("リクエストがタイムアウトしました");
  }, 14 * 60 * 1000);
  // 社員情報の取得
  const employees = await EmployeeDao.listCompany(listEmployeesCompany, {
    companyID: "SCC",
  });
  if (!employees) {
    // 社員が取得できなかった場合
    throw new Error("Failed to fetch Employee");
  }

  // シート情報の取得
  // const sheets = await SheetDao.listCompany(listSheetsReviewee, {
  //   companyID: companyId,
  // });
  // クエリの関係で仮実装
  const sheets = await SheetDao.list(listSheets, {
    filter: {
      companyID: {
        eq: companyId,
      },
    },
  });

  if (!sheets) {
    throw new Error("Failed to fetch Sheet");
  }

  const data: {
    sheets: (Sheet | null)[];
    sections: (Section | null)[];
    objectives: (Objective | null)[];
    reports: (Report | null)[];
  } = {
    sheets: sheets || [],
    sections: [],
    objectives: [],
    reports: [],
  };

  // 報告書の取得
  const reports = await ReportDao.listCompanyDate(listReportsCompanyDate, {
    companyID: companyId,
  });

  employees.forEach((employee) => {
    if (!employee) return;
    // 権限取得
    const reviewers = GetPermission(employee, employees);
    const secondReviewers = reviewers.secondReviewers;
    const topReviewers = reviewers.topReviewers;
    const referencer = reviewers.referencer;

    // 選択シートを取得
    const selectedSheets = sheets.filter(
      (sheet) => sheet?.sub === employee.sub
    );
    selectedSheets.forEach((sheet) => {
      if (!sheet) return;
      // 選択シートの権限を上書き
      sheet.secondReviewers = secondReviewers;
      sheet.topReviewers = topReviewers;
      sheet.referencer = referencer;

      data.sheets.push(sheet);

      sheet?.section?.items?.forEach((section) => {
        if (!section) return;

        // 選択セクションの権限を上書き
        section.secondReviewers = secondReviewers;
        section.topReviewers = topReviewers;
        section.referencer = referencer;

        data.sections.push(section);

        section?.objective?.items?.forEach((objective) => {
          if (!objective) return;
          // 選択目標の権限を上書き
          objective.secondReviewers = secondReviewers;
          objective.topReviewers = topReviewers;
          objective.referencer = referencer;

          data.objectives.push(objective);
        });
      });
    });
    // 報告書を選択
    const selectedReports = reports?.filter(
      (report) => report?.sub === employee.sub
    );
    const referencerReport = employees.map((employee) => {
      return employee?.username || null;
    });

    selectedReports?.forEach((report) => {
      if (!report) return;
      // 選択報告書の権限を上書き
      report.reviewer = secondReviewers;
      report.referencer = referencerReport;
      data.reports.push(report);
    });
  });
  await Apply(data.sheets, data.sections, data.objectives, data.reports);

  AWS.config.update({ region: "us-east-1" });
  const ses = new AWS.SES();
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: "社員情報が正しく更新されました。",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "「Simplet's」社員管理 変更結果のお知らせ",
      },
    },
    Source: "simplets_desk@simplets.jp" /* required */,
  };
  const response = await ses.sendEmail(params).promise();
  console.log("response", response);

  return {
    __typename: "UpdateOwnerResponseType",
    message: "Update success!",
    isSuccess: true,
  };
}
