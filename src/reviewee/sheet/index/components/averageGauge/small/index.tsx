import { Section } from "App"
import { calcAvg, getSectionKeys, round } from "lib/util"
import React from "react"
import { SmallGage } from "../../gage/small"

type Props = {
    section: Section
}

export const AverageSmallGaugeBox = (props: Props) => {
    // カテゴリ別の平均算出処理
    let avg: number | null = null
    if(props.section.objective && props.section.objective.items){
        const objectives = props.section.objective.items
        const data = objectives.map(objective => {
            return objective?.progress || objective?.progress === 0 ? objective.progress : 0
        })
        avg = calcAvg(data)
    }

    return (
        <h4>
            {props.section.category?.name}
            {avg || avg === 0 ? <SmallGage value={parseInt(round(avg, 2).toFixed(1))} id={getSectionKeys(props.section).replace(/[.@]/g,'-')} /> : null}
        </h4>
    )
}