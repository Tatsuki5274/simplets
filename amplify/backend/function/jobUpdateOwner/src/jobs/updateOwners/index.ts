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

  // 社員情報の取得
  const employees = await EmployeeDao.listCompany(listEmployeesCompany, {
    companyID: "SCC",
  });
  if (!employees) {
    // 社員が取得できなかった場合
    throw new Error("Employees couldn't get");
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
    throw new Error("sheet couldn't get.");
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

  // const result = await CustomDao.sendEmail({
  //   to: [email],
  //   subject: "[成功]更新結果通知",
  //   body: "リクエストの正常終了をお知らせします。",
  // });
  // console.log("mail result", JSON.stringify(result));

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
          Data: "リクエストの正常終了をお知らせします。",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "[成功]更新結果通知",
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
