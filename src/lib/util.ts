import { routeBuilder } from "router";
import { Objective, ReportWorkingStatus, Section, Sheet } from "API";
import dateFormat from "dateformat";

/**
 * 
 * @param nums 平均算出に使う数字を指定する。nullはカウント対象外
 */
export function calcAvg(nums: (number | null)[]): number | null{
    let sum = 0;
    let cnt = 0;
    let ret = null;

    nums.forEach((num)=>{
        if(num || num === 0){
            sum += num;
            cnt++;
        }
    })
    if(cnt > 0) ret = sum / cnt;
    return ret;
}

/**
 * 
 * @param num 対象の値
 * @param d 四捨五入の桁数
 * @returns 四捨五入結果
 */
export function round(num: number, d: number){
    const n = d - 1 ;	// 小数点第n位まで残す
    const result = Math.round( num * Math.pow( 10, n ) ) / Math.pow( 10, n ) ;
    return result
}

/**
 * 
 * @param sheet sheetKeysを作成するための元シート
 * @returns 一つでsheetKeysを一意に表現するkey
 */
export function getSheetKeys(sheet: Sheet): string{
    return `${sheet.companyID}.${sheet.reviewee}.${sheet.year}`
}

/**
 * 
 * @param section sectionKeysを作成するための元データ
 * @returns 一つでsectionKeysを一意に表現するkey
 */
export function getSectionKeys(section: Section): string{
    return `${section.sheetKeys}.${section.sectionCategoryLocalId}`
}

/**
 * 
 * @param objective objectiveKeysを作成するための元データ
 * @returns 一つでobjectiveを一意に表現するkey
 */
export function getObjectiveKeys(objective: Objective): string{
    return `${objective.sectionKeys}.${objective.createdAt}`
}

/**
 * 
 * @param startMonth 開始月
 * @returns 今年の年度
 */
export function getThisYear(startMonth = 1): number{
    const today: Date = new Date();
    const dateMonth = startMonth - 1 //1月が0のため
    const thisYear = today.getMonth() < dateMonth ? today.getFullYear() - 1 : today.getFullYear()
    return thisYear
}

/**
 * 
 * @param isManager マネージャ権限の有無
 * @param isAdmin 管理者権限の有無
 * @returns サイドバーの表示内容
 */
export function createSidebarElements(isManager: boolean, isAdmin: boolean): { label: string; dest: string; }[][] {
    const today = new Date()
    let results = [
        [
            {
                label: "業績評価一覧",
                dest: routeBuilder.revieweeListPath()
            },
        ]
        // , [
        //     {
        //         label: "作業報告入力",
        //         dest: routeBuilder.revieweeReportCalendarPath(today)
        //     },
        // ]
    ]
    const managerContents = [
        [
            {
                label: "進捗参照",
                dest: routeBuilder.reviewerListPath()
            }, {
                label: "総合評価参照",
                dest: routeBuilder.reviewerEvaluationListPath()
            }
        ]
        // , [
        //     {
        //         label: "報告参照カレンダー",
        //         dest: routeBuilder.reviewerReportCalendarPaht(today)
        //     }, {
        //         label: "報告参照社員",
        //         dest: routeBuilder.reviewerReportEmployeePath()
        //     }

        // ]
    ]

    const adminContents = [
        {
            label: "社員管理",
            dest: "/admin"
        }, {
            label: "部署管理",
            dest: "/admin"
        }, {
            label: "カテゴリ管理",
            dest: "/admin"
        }
    ]

    if (isManager && isAdmin) {
        for (let i = 0; i < results.length; i++) {
            for (let j = 0; j < managerContents.length; j++)
                results[i].push(managerContents[i][j])
        }
        results.push(adminContents)
    } else if (isAdmin) {
        results.push(adminContents)
    } else if (isManager) {
        for (let i = 0; i < results.length; i++) {
            for (let j = 0; j < managerContents[i].length; j++)
                results[i].push(managerContents[i][j])
        }
    }
    return results
}

export function createGaugeId(id:string):string{
    return id.replace(/[.@+]/g, '-')
}


/**
 * 
 * @param date 日付情報
 * @returns AWSDate型の文字列を返却
 */
export function parseToAWSDateFromJsDate(date: Date): string{
    return dateFormat(date, "yyyy-mm-ddZ")
}

/**
 * 
 * @param dateStr AWSDate型の文字列
 * @returns JavaScriptのDate型オブジェクトを返却
 */
export function parseToJsDateFromAWSDate(dateStr: string): Date | null{
    try{
        const date: Date = new Date(dateStr)
        return date
    }catch(e){
        console.error("parse exception", e)
        return null
    }
}

/**
 * 
 * @param status 報告ステータス
 * @returns ステータスの文字列を返却
 */
export function getReportStatusString(status: ReportWorkingStatus): string{
    let result = "未定義"
    switch(status){
        case ReportWorkingStatus.OK:
            result = "順調に作業できている"
            break
        case ReportWorkingStatus.InTask:
            result = "課題はあるが作業できている"
            break
        case ReportWorkingStatus.InProblem:
            result = "問題が発生している"
            break
    }
    return result
}