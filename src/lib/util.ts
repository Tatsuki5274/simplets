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