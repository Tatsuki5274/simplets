import { Section } from "API"
import { calcAvg, createGaugeId, getSectionKeys, round } from "lib/util"
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
            {props.section.sectionCategoryName}
            {avg || avg === 0 ? <SmallGage value={parseInt(round(avg, 2).toFixed(1))} id={createGaugeId(getSectionKeys(props.section))} /> : null}
        </h4>
    )
}