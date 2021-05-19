import { routeBuilder } from "router";
import {
  EmployeeType,
  GetEmployeeQueryVariables,
  ListEmployeesCompanyQueryVariables,
  ReportWorkingStatus,
} from "API";
import dateFormat from "dateformat";
import { EmployeeDao } from "./dao/employeeDao";
import { getEmployee, listEmployeesCompany } from "graphql/queries";

/**
 *
 * @param nums 平均算出に使う数字を指定する。nullはカウント対象外
 */
export function calcAvg(nums: (number | null)[]): number | null {
  let sum = 0;
  let cnt = 0;
  let ret = null;

  nums.forEach((num) => {
    if (num || num === 0) {
      sum += num;
      cnt++;
    }
  });
  if (cnt > 0) ret = sum / cnt;
  return ret;
}

/**
 *
 * @param num 対象の値
 * @param d 四捨五入の桁数
 * @returns 四捨五入結果
 */
export function round(num: number, d: number) {
  const n = d - 1; // 小数点第n位まで残す
  const result = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
  return result;
}

/**
 *
 * @param startMonth 開始月
 * @returns 今年の年度
 */
export function getThisYear(startMonth = 1): number {
  const today: Date = new Date();
  const dateMonth = startMonth - 1; //1月が0のため
  const thisYear =
    today.getMonth() < dateMonth
      ? today.getFullYear() - 1
      : today.getFullYear();
  return thisYear;
}

/**
 *
 * @param isManager マネージャ権限の有無
 * @param isAdmin 管理者権限の有無
 * @returns サイドバーの表示内容
 */
export function createSidebarElements(
  isManager: boolean,
  isAdmin: boolean
): { label: string; dest: string }[][] {
  const today = new Date();
  const results = [
    [
      {
        label: "業績評価一覧",
        dest: routeBuilder.revieweeListPath(),
      },
    ],
    [
      {
        label: "作業報告入力",
        dest: routeBuilder.revieweeReportCalendarPath(today),
      },
      {
        label: "報告参照カレンダー",
        dest: routeBuilder.reviewerReportCalendarPaht(today),
      },
      {
        label: "報告参照社員",
        dest: routeBuilder.reviewerReportEmployeePath(),
      },
    ],
  ];
  const managerContents = [
    [
      {
        label: "進捗参照",
        dest: routeBuilder.reviewerListPath(),
      },
      {
        label: "総合評価参照",
        dest: routeBuilder.reviewerEvaluationListPath(),
      },
    ],
    [],
  ];

  const adminContents = [
    {
      label: "社員管理",
      dest: routeBuilder.adminEmployeeListPath(),
    },
    {
      label: "部署管理",
      dest: routeBuilder.adminGroupListPath(),
    },
    {
      label: "カテゴリ管理",
      dest: routeBuilder.adminCategoryListPath(),
    },
  ];

  if (isManager && isAdmin) {
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < managerContents.length; j++) {
        if (managerContents[i][j]) {
          results[i].push(managerContents[i][j]);
        }
      }
    }
    results.push(adminContents);
  } else if (isAdmin) {
    results.push(adminContents);
  } else if (isManager) {
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < managerContents[i].length; j++)
        results[i].push(managerContents[i][j]);
    }
  }
  return results;
}

export function createGaugeId(id: string): string {
  return id.replace(/[.@+]/g, "-");
}

/**
 *
 * @param date 日付情報
 * @returns AWSDate型の文字列を返却
 */
export function parseToAWSDateFromJsDate(date: Date): string {
  return dateFormat(date, "yyyy-mm-ddZ");
}

/**
 *
 * @param dateStr AWSDate型の文字列
 * @returns JavaScriptのDate型オブジェクトを返却
 */
export function parseToJsDateFromAWSDate(dateStr: string): Date | null {
  try {
    const date: Date = new Date(dateStr);
    return date;
  } catch (e) {
    // console.error("parse exception", e);
    return null;
  }
}

/**
 *
 * @param status 報告ステータス
 * @returns ステータスの文字列を返却
 */
export function getReportStatusString(status: ReportWorkingStatus): string {
  let result = "未定義";
  switch (status) {
    case ReportWorkingStatus.OK:
      result = "順調に作業できている";
      break;
    case ReportWorkingStatus.InTask:
      result = "課題はあるが作業できている";
      break;
    case ReportWorkingStatus.InProblem:
      result = "問題が発生している";
      break;
  }
  return result;
}

/**
 *
 * @param str 文字列
 * @returns 文字列の高さを返却
 */
export function CountLine(str: string): number {
  const num = str.match(/\r\n|\n/g);
  let line = 0;
  if (num != null) {
    line = num.length + 1;
    if (line <= 5) {
      line = 5;
    }
  } else {
    line = 5;
  }
  return line;
}

/**
 *
 * @param reviewee 社員
 * @param companyId 会社ID
 * @returns 所属長,部門長,参照者を返却
 */
export async function getReviewers(reviewee: string) {
  type ResultType = {
    topReviewers: string[] | null;
    secondReviewers: string[] | null;
    referencer: string[] | null;
  };
  const result: ResultType = {
    topReviewers: null,
    secondReviewers: null,
    referencer: null,
  };

  const getI: GetEmployeeQueryVariables = {
    username: reviewee,
  };
  const revieweeEmployee = await EmployeeDao.get(getEmployee, getI);

  if (revieweeEmployee) {
    //上司情報を取得
    if (revieweeEmployee.superior?.username) {
      result.secondReviewers = [revieweeEmployee.superior.username];
      if (revieweeEmployee.superior.superior?.username) {
        result.topReviewers = [revieweeEmployee.superior.superior.username];
      }
    }

    //参照者情報を取得
    const superManagersI: ListEmployeesCompanyQueryVariables = {
      companyID: revieweeEmployee.companyID,
      filter: {
        manager: {
          eq: EmployeeType.SUPER_MANAGER,
        },
      },
    };

    const groupManagersI: ListEmployeesCompanyQueryVariables = {
      companyID: revieweeEmployee.companyID,

      filter: {
        groupID: {
          eq: revieweeEmployee.groupID,
        },
        manager: {
          eq: EmployeeType.MANAGER,
        },
      },
    };
    const superManagers = await EmployeeDao.listCompany(
      listEmployeesCompany,
      superManagersI
    );
    const groupManagers = await EmployeeDao.listCompany(
      listEmployeesCompany,
      groupManagersI
    );

    const listSuperManagers: Array<string> = [];
    const listGroupManagers: Array<string> = [];
    superManagers?.forEach((element) =>
      listSuperManagers.push(element.username || "")
    );
    groupManagers?.forEach((element) =>
      listGroupManagers.push(element.username || "")
    );

    const managers = listSuperManagers.concat(listGroupManagers);
    result.referencer = managers;
  }
  return result;
}

/**
 *
 * @param dateStr 日付
 * @returns yyyy/mm/dd HH:MMの文字列を返却
 */
export function formatSheetCheckDate(dateStr: string): string {
  const formatDate = dateStr.replace(
    /(\d+)-(\d+)-(\d+)-(\d+):(\d+)/g,
    "$1/$2/$3 $4:$5"
  );
  return formatDate;
}
