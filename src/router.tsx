import dateFormat from "dateformat";
import RevieweeSheetShow from "reviewee/sheet/index/index";
import ListPerformanceEvalution from "reviewee/list/performance";
import EvaluationScreen from "reviewer/sheet";
import { PDFPage } from "views/pdf/page";
import EditReportScreeen from "views/components/report/reviewer/pages/EditReportScreeen";
import ChangeReportScreen from "views/components/report/reviewee/pages/ChangeReportScreen";
import ProgressReferenceScreen from "views/components/evaluation/reviewee/pages/ProgressReferenceScreen";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminEmployeeCreate from "views/components/admin/employee/pages/AdminEmployeeCreate";
import EvaluationList from "views/components/evaluation/reviewer/pages/EvaluationList";
import RevieweeReportList from "views/components/report/reviewee/pages/RevieweeReportList";
import AdminCategoryCreatePage from "views/components/admin/category/pages/AdminCategoryCreatePage";
import AdminCategoryEditPage from "views/components/admin/category/pages/AdminCategoryEditPage";
import AdminCategoryListPage from "views/components/admin/category/pages/AdminCategoryListPage";
import AdminEmployeeEdit from "views/components/admin/employee/pages/AdminEmployeeEdit";
import AdminEmployeeList from "views/components/admin/employee/pages/AdminEmployeeList";
import AdminGroupChangePage from "views/components/admin/group/pages/AdminGroupChangePage";
import AdminGroupCreatePage from "views/components/admin/group/pages/AdminGroupCreatePage";
import AdminGroupListPage from "views/components/admin/group/pages/AdminGroupListPage";
import { CreateReportScreen } from "views/components/report/reviewee/pages/CreateReportScreen";
import ReportListScreen from "views/components/report/reviewer/pages/ReportListScreen";
import ReviewerReportListCalendar from "views/components/report/reviewer/pages/ReviewerReportListCalendar";

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
          component={ReviewerReportListCalendar}
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
          path={routeBuilder.adminGroupEditPath(":groupId")}
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
