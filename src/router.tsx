import dateFormat from "dateformat"
import RevieweeSheetShow from "reviewee/sheet/index/index"
import ListPerformanceEvalution from 'reviewee/list/performance';
import EvaluationScreen from "reviewer/sheet";
import { PDFPage } from 'views/pdf/page';
import EvaluationList from 'views/components/pages/evaluation/reviewer/EvaluationList';　//総合評価参照画面 テスト用
import RevieweeReportList from 'views/components/pages/report/reviewee/RevieweeReportList';
import EditReportScreeen from 'views/components/pages/report/reviewer/EditReportScreeen';
import ReportListScreen from 'views/components/pages/report/reviewer/ReportListScreen';
import ChangeReportScreen from 'views/components/pages/report/reviewee/ChangeReportScreen';
import ReviewerReportList from 'views/components/pages/report/reviewer/ReviewerReportListCalendar';
import ProgressReferenceScreen from 'views/components/pages/progress/reviewee/ProgressReferenceScreen';
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function Router(){
    return (
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ListPerformanceEvalution} />
          <Route exact path={routeBuilder.revieweeDetailPath(":sub", ":year")} component={RevieweeSheetShow} />
          <Route exact path={routeBuilder.revieweeListPath()} component={ListPerformanceEvalution} />
          <Route exact path={routeBuilder.reviewerListPath()} component={ProgressReferenceScreen} />
          <Route exact path={routeBuilder.reviewerDetailPath(":sub", ":year")} component={EvaluationScreen} />
          <Route exact path={routeBuilder.previewPath(":sub", ":year")} component={PDFPage} />
          <Route exact path={routeBuilder.reviewerEvaluationListPath()} component={EvaluationList} />

          <Route exact path={routeBuilder.revieweeReportCalendarPath(":date")} component={RevieweeReportList} />
          <Route exact path={routeBuilder.revieweeReportEditPath(":date")} component={ChangeReportScreen} />
          <Route exact path={routeBuilder.reviewerReportCommentPath(":date", ":sub")} component={EditReportScreeen} />
          <Route exact path={routeBuilder.reviewerReportEmployeePath()} component={ReportListScreen} />
          <Route exact path={routeBuilder.reviewerReportCalendarPaht(":date")} component={ReviewerReportList} />
        </Switch>
      </BrowserRouter>
    )
}

// パスを生成する関数
export const routeBuilder = {
    revieweeDetailPath: (sub: string, year: string, host?: string)=>{
        return `${host || ""}/reviewee/evaluation/${sub}/${year}`
    },
    reviewerDetailPath: (sub: string, year: string, host?: string)=>{
        return `${host || ""}/reviewer/evaluation/${sub}/${year}`
    },
    revieweeListPath: (host?: string) =>{
        return `${host || ""}/reviewee/ref/evaluation/list`
    },
    reviewerListPath: (host?: string) =>{
        return `${host || ""}/reviewer/ref/evaluation/list/progress`
    },
    reviewerEvaluationListPath: (host?: string) =>{
        return `${host || ""}/reviewer/ref/evaluation/list/rate`
    },

    revieweeReportCalendarPath: (date: Date | string, host?: string) => {
        let dateStr: string = ""
        if(typeof date === "string") dateStr = date
        else dateStr = dateFormat(date, "yyyy-mm")
        return `${host || ""}/reviewee/report/calendar/${dateStr}`
    },
    revieweeReportEditPath: (date: Date | string, host?: string) => {
        let dateStr: string = ""
        if(typeof date === "string") dateStr = date
        else dateStr = dateFormat(date, "yyyy-mm-dd")
        return `${host || ""}/reviewee/report/edit/${dateStr}`
    },
    reviewerReportCommentPath: (date: Date | string, sub: string, host?: string) => {
        let dateStr: string = ""
        if(typeof date === "string") dateStr = date
        else dateStr = dateFormat(date, "yyyy-mm-dd")
        return `${host || ""}/reviewer/report/edit/${sub}/${dateStr}`
    },
    reviewerReportEmployeePath: (host?: string) => {
        return `${host || ""}/reviewer/report/employee`
    },
    reviewerReportCalendarPaht: (date: Date | string, host?: string) => {
        let dateStr: string = ""
        if(typeof date === "string") dateStr = date
        else dateStr = dateFormat(date, "yyyy-mm")
        return `${host || ""}/reviewer/report/calendar/${dateStr}`
    },
    previewPath: (sub: string, year: string, host?: string)=>{
        return `${host || ""}/preview/${sub}/${year}`
    },
}