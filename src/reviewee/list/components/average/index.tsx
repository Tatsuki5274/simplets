import { Sheet } from "App"
import { calcAvg } from "lib/util"
import React from "react"

type Props = {
    sheet: Sheet
}

export function DisplaySheetAverage(props: Props) {
    // カテゴリ別の平均算出処理
    let avg: number | null = null
    const sections = props.sheet.section?.items
    let result = "-"
    if(sections){
        const data = sections.map(section=>{
            let ret: (number | null)[]= []
            // カテゴリ別の進捗率の平均値を算出
            if(section?.objective?.items){
                ret = section.objective.items.map(obj=>{
                    return obj?.progress || obj?.progress === 0 ? obj.progress : 0
                })
            }
            return ret
        })

        // 二次元の平均データをそれぞれ平均化
        const data2 = data.map(num=>{
            return calcAvg(num)
        })

        //それぞれの平均を算出
        avg = calcAvg(data2)
        
        if(avg || avg === 0){
            result = `${avg.toFixed(1)}%`
        }
    }

    return (
        <span>{result}</span>
    )
}