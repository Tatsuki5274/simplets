// 今後、ルーティング設定をここに移動

import dateFormat from "dateformat"

// パスを生成する関数
export const routeBuilder = {
    revieweeDetailPath: (sub: string, year: string, host?: string)=>{
        return `${host || ""}/reviewee/${sub}/${year}`
    },
    reviewerDetailPath: (sub: string, year: string, host?: string)=>{
        return `${host || ""}/reviewer/${sub}/${year}`
    },
    revieweeListPath: (host?: string) =>{
        return `${host || ""}/reviewee/list`
    },
    reviewerListPath: (host?: string) =>{
        return `${host || ""}/reviewer/list`
    },
    reviewerEvaluationListPath: (host?: string) =>{
        return `${host || ""}/reviewer/evaluationlist`
    },

    revieweeReportCalendarPath: (date: Date | string, host?: string) => {
        let dateStr: string = ""
        if(typeof date === "string") dateStr = date
        else dateStr = dateFormat(date, "yyyy-mm")
        return `${host || ""}/reviewee/report/calendar/${dateStr}`
    },
    revieweeReportNewPath: (date: Date | string, host?: string) => {
        let dateStr: string = ""
        if(typeof date === "string") dateStr = date
        else dateStr = dateFormat(date, "yyyy-mm-dd")
        return `${host || ""}/reviewee/report/new/${dateStr}`
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