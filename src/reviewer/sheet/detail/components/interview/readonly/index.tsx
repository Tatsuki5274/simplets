import { Sheet } from "API"
import { tableHeaderStyle, textareaDisplayStyle } from "common/globalStyle.module.scss"
import React from "react"
import { Table } from "react-bootstrap"

type Props = {
    sheet: Sheet
}

export const ReviewerSheetDetailInterviewReadonly = (props: Props)=>{
    return <Table bordered>
            <thead className={tableHeaderStyle}>
                <tr>
                    <td>目的</td>
                    <td>実施日時</td>
                    <td>内容</td>
                </tr>
            </thead>
            <tbody>
                {/* インタビュー実施記録　情報表示 */}
                <tr>
                    <td>目標設定</td>
                    <td>
                        {props.sheet.interviewPlanDate}
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.interviewPlanDate || ""), "yyyy/mm/dd")}</td> */}
                    <td className={textareaDisplayStyle}>
                        {props.sheet.interviewPlanComment}
                    </td>
                </tr>
                <tr>
                    <td>中間#1</td>
                    <td>
                        {props.sheet.InterviewMid1Date}
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid1Date || ""), "yyyy/mm/dd")}</td> */}
                    <td className={textareaDisplayStyle}>
                        {props.sheet.InterviewMid1Comment}
                    </td>
                </tr>
                <tr>
                    <td>中間#2</td>
                    <td>
                        {props.sheet.InterviewMid2Date}
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid2Date || ""), "yyyy/mm/dd")}</td> */}
                    <td className={textareaDisplayStyle}>
                        {props.sheet.InterviewMid2Comment}
                    </td>
                </tr>
                <tr>
                    <td>中間#3</td>
                    <td>
                        {props.sheet.InterviewMid3Date}
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid3Date || ""), "yyyy/mm/dd")}</td> */}
                    <td className={textareaDisplayStyle}>
                        {props.sheet.InterviewMid3Comment}
                    </td>
                </tr>
            </tbody>

        </Table>
}