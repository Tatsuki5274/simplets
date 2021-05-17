import dateFormat from "dateformat";
import RevieweeSheetShow from "reviewee/sheet/index/index";
import ListPerformanceEvalution from "reviewee/list/performance";
import EvaluationScreen from "reviewer/sheet";
import { PDFPage } from "views/pdf/page";
import EvaluationList from "views/components/pages/evaluation/reviewer/EvaluationList"; //総合評価参照画面 テスト用
import RevieweeReportList from "views/components/pages/report/reviewee/RevieweeReportList";
import EditReportScreeen from "views/components/pages/report/reviewer/EditReportScreeen";
import ReportListScreen from "views/components/pages/report/reviewer/ReportListScreen";
import ChangeReportScreen from "views/components/pages/report/reviewee/ChangeReportScreen";
import ReviewerReportList from "views/components/pages/report/reviewer/ReviewerReportListCalendar";
import ProgressReferenceScreen from "views/components/pages/progress/reviewee/ProgressReferenceScreen";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminEmployeeList from "views/components/pages/admin/employee/AdminEmployeeList";
import AdminEmployeeCreate from "views/components/pages/admin/employee/AdminEmployeeCreate";
import AdminEmployeeEdit from "views/components/pages/admin/employee/AdminEmployeeEdit";
import AdminGroupCreatePage from "views/components/pages/admin/group/AdminGroupCreatePage";
import AdminGroupListPage from "views/components/pages/admin/group/AdminGroupListPage";
import AdminGroupChangePage from "views/components/pages/admin/group/AdminGroupChangePage";
import AdminCategoryListPage from "views/components/pages/admin/category/AdminCategoryListPage";
import AdminCategoryEditPage from "views/components/pages/admin/category/AdminCategoryEditPage";
import AdminCategoryCreatePage from "views/components/pages/admin/category/AdminCategoryCreatePage";
import { CreateReportScreen } from "views/components/pages/report/reviewee/CreateReportScreen";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ListPerformanceEvalution} />
        <Route
          exact
          path={routeBuilder.revieweeDetailPath(":sheetId")}
          component={RevieweeSheetShow}
        />
        <Route
          exact
          path={routeBuilder.revieweeListPath()}
          component={ListPerformanceEvalution}
        />
        <Route
          exact
          path={routeBuilder.reviewerListPath()}
          component={ProgressReferenceScreen}
        />
        <Route
          exact
          path={routeBuilder.reviewerDetailPath(":sheetId")}
          component={EvaluationScreen}
        />
        <Route
          exact
          path={routeBuilder.previewPath(":sheetId")}
          component={PDFPage}
        />
        <Route
          exact
          path={routeBuilder.reviewerEvaluationListPath()}
          component={EvaluationList}
        />

        <Route
          exact
          path={routeBuilder.revieweeReportCalendarPath(":date")}
          component={RevieweeReportList}
        />
        <Route
          exact
          path={routeBuilder.revieweeReportNewPath(":date")}
          component={CreateReportScreen}
        />
        <Route
          exact
          path={routeBuilder.revieweeReportEditPath(":reportId")}
          component={ChangeReportScreen}
        />
        <Route
          exact
          path={routeBuilder.reviewerReportCommentPath(":reportId")}
          component={EditReportScreeen}
        />
        <Route
          exact
          path={routeBuilder.reviewerReportEmployeePath()}
          component={ReportListScreen}
        />
        <Route
          exact
          path={routeBuilder.reviewerReportCalendarPaht(":date")}
          component={ReviewerReportList}
        />

        {/* 管理画面 */}
        {/* 社員管理画面 */}
        <Route
          exact
          path={routeBuilder.adminEmployeeListPath()}
          component={AdminEmployeeList}
        />
        <Route
          exact
          path={routeBuilder.adminEmployeeNewPath()}
          component={AdminEmployeeCreate}
        />
        <Route
          exact
          path={routeBuilder.adminEmployeeEditPath(":employeeId")}
          component={AdminEmployeeEdit}
        />

        {/* 部署管理画面 */}
        <Route
          exact
          path={routeBuilder.adminGroupNewPath()}
          component={AdminGroupCreatePage}
        />
        <Route
          exact
          path={routeBuilder.adminGroupEditPath(":groupLocalId")}
          component={AdminGroupChangePage}
        />
        <Route
          exact
          path={routeBuilder.adminGroupListPath()}
          component={AdminGroupListPage}
        />

        {/* カテゴリ管理画面 */}
        <Route
          exact
          path={routeBuilder.adminCategoryNewPath()}
          component={AdminCategoryCreatePage}
        />
        <Route
          exact
          path={routeBuilder.adminCategoryEditPath(":categoryLocalId")}
          component={AdminCategoryEditPage}
        />
        <Route
          exact
          path={routeBuilder.adminCategoryListPath()}
          component={AdminCategoryListPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

// パスを生成する関数
export const routeBuilder = {
  revieweeDetailPath: (id: string, host?: string) => {
    return `${host || ""}/reviewee/evaluation/${id}`;
  },
  reviewerDetailPath: (id: string, host?: string) => {
    return `${host || ""}/reviewer/evaluation/${id}`;
  },
  revieweeListPath: (host?: string) => {
    return `${host || ""}/reviewee/ref/evaluation/list`;
  },
  reviewerListPath: (host?: string) => {
    return `${host || ""}/reviewer/ref/evaluation/list/progress`;
  },
  reviewerEvaluationListPath: (host?: string) => {
    return `${host || ""}/reviewer/ref/evaluation/list/rate`;
  },

  revieweeReportCalendarPath: (date: Date | string, host?: string) => {
    let dateStr = "";
    if (typeof date === "string") dateStr = date;
    else dateStr = dateFormat(date, "yyyy-mm");
    return `${host || ""}/reviewee/report/calendar/${dateStr}`;
  },
  revieweeReportNewPath: (date: Date | string, host?: string) => {
    let dateStr = "";
    if (typeof date === "string") dateStr = date;
    else dateStr = dateFormat(date, "yyyy-mm-dd");
    return `${host || ""}/reviewee/report/new/${dateStr}`;
  },
  revieweeReportEditPath: (id: string, host?: string) => {
    return `${host || ""}/reviewee/report/edit/${id}`;
  },
  reviewerReportCommentPath: (id: string, host?: string) => {
    return `${host || ""}/reviewer/report/edit/${id}`;
  },
  reviewerReportEmployeePath: (host?: string) => {
    return `${host || ""}/reviewer/report/employee`;
  },
  reviewerReportCalendarPaht: (date: Date | string, host?: string) => {
    let dateStr = "";
    if (typeof date === "string") dateStr = date;
    else dateStr = dateFormat(date, "yyyy-mm");
    return `${host || ""}/reviewer/report/calendar/${dateStr}`;
  },
  previewPath: (id: string, host?: string) => {
    return `${host || ""}/preview/${id}`;
  },

  adminEmployeeNewPath: (host?: string) => {
    return `${host || ""}/admin/employee/new`;
  },
  adminEmployeeEditPath: (employeeId: string, host?: string) => {
    return `${host || ""}/admin/employee/${employeeId}/edit`;
  },
  adminEmployeeListPath: (host?: string) => {
    return `${host || ""}/admin/employee/list`;
  },

  adminGroupNewPath: (host?: string) => {
    return `${host || ""}/admin/group/new`;
  },
  adminGroupEditPath: (groupId: string, host?: string) => {
    return `${host || ""}/admin/group/${groupId}/edit`;
  },
  adminGroupListPath: (host?: string) => {
    return `${host || ""}/admin/group/list`;
  },

  adminCategoryNewPath: (host?: string) => {
    return `${host || ""}/admin/category/new`;
  },
  adminCategoryEditPath: (categoryId: string, host?: string) => {
    return `${host || ""}/admin/category/${categoryId}/edit`;
  },
  adminCategoryListPath: (host?: string) => {
    return `${host || ""}/admin/category/list`;
  },
};
