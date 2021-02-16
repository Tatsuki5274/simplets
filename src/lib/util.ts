import { Objective, Section, Sheet } from "API";

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

export function createGaugeId(id:string):string{
    return id.replace(/[.@+]/g, '-')
}