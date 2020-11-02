import { Sheet } from "App"
import React from "react"

type Props = {
    sheet: Sheet
}
export const ReviewerSheetDetailCareerReadonly = (props: Props)=>{
    return <div>
        <h4>本人希望</h4>
        {/* 本人希望　情報表示 */}
        <p>{props.sheet.careerPlan}</p>


        <h4>話し合い結果</h4>
        <p>{props.sheet.careerPlanComment}</p>
    </div>
}