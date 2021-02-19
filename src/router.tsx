// 今後、ルーティング設定をここに移動

import dateFormat from "dateformat"

// パスを生成する関数
export const routeBuilder = {
    revieweeDetailPath: (companyId: string, reviewee: string, year: string, host?: string)=>{
        return `${host || ""}/reviewee/company/${companyId}/reviewee/${reviewee}/year/${year}`
    },
    reviewerDetailPath: (companyId: string, reviewee: string, year: string, host?: string)=>{
        return `${host || ""}/reviewer/company/${companyId}/reviewee/${reviewee}/year/${year}`
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
    reviewerReportCommentPath: (date: Date | string, username: string, host?: string) => {
        let dateStr: string = ""
        if(typeof date === "string") dateStr = date
        else dateStr = dateFormat(date, "yyyy-mm-dd")
        return `${host || ""}/reviewer/report/edit/${dateStr}/${username}`
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
    previewPath: (companyId: string, reviewee: string, year: string, host?: string)=>{
        return `${host || ""}/preview/company/${companyId}/reviewee/${reviewee}/year/${year}`
    },
}