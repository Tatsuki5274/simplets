import { Objective, Section, Sheet } from "App";

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
 * @param sheet 進捗率を抽出したい元シート
 * @returns カテゴリ毎の進捗率平均値
 */
// export function extProgressFromSheet(sheet: Sheet): ((number | null)[] | null)[] | null{
//     const prg = sheet.section?.items?.map(section => {
//         let ret = null
//         if(section?.objective?.items){
//             ret = section?.objective?.items?.map(objective => {
//                 return objective?.progress ? objective.progress : null
//             })
//         }
//         return ret   
//     })
//     const ret = prg ? prg : null
//     return ret
// }


// export function extProgressFromSection(section: Pick<Section, "objective">): (number | null)[] | null{
//     let ret: (number | null)[] | null = null 
//     if(section.objective?.items){
//         ret = section.objective.items.map(objective => {
//             return objective?.progress ? objective.progress : null
//         })
//     }
//     return ret
// }


/**
 * 
 * @param inputSheet 変更元のシート
 * @param updateObjective 変更後の目標
 */
export function updateObjectiveFromSheet(baseSheet: Sheet, updateObjective: Objective): Sheet{
    // 現状未使用のコード。リアルタイムでの更新のために今後利用する予定。
    const result: Sheet = {...baseSheet}

    result.section?.items?.forEach((section) => {
        section?.objective?.items?.forEach(objective => {
            if(objective?.id === updateObjective.id){
                // 型不一致のため参照の上書きができない
                // objective = updateObjective
            }
        })
    })

    // const foundSection = result.section?.items?.find(section => {
    //     return section?.objective?.items?.find(objective => {
    //         return objective?.id === updateObjective.id
    //     })
    // })
    // let foundObjective = foundSection?.objective?.items?.find(objective => {
    //     return objective?.id === updateObjective.id
    // })
    // foundObjective = updateObjective
    return result
}