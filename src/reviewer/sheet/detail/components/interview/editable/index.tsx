import { Sheet } from "App"
import React from "react"
import { Table } from "react-bootstrap"
import style from '../common/style.module.scss';

type Props = {
    handleChange: (e: React.ChangeEvent<any>)=> void,
    sheet: Sheet
}

export const ReviewerSheetDetailInterviewEditable = (props: Props)=>{
    return <Table bordered striped>
            <thead>
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
                        <input
                            type="date"
                            name="interviewPlanDate"
                            onChange={props.handleChange}
                            defaultValue={props.sheet.interviewPlanDate || ""}
                        />
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.interviewPlanDate || ""), "yyyy/mm/dd")}</td> */}
                    <td>
                        <textarea
                            className={style.detailTextarea}
                            name="interviewPlanComment" 
                            onChange={props.handleChange}
                        >
                            {props.sheet.interviewPlanComment}
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td>中間#1</td>
                    <td>
                        <input
                            type="date"
                            name="InterviewMid1Date"
                            onChange={props.handleChange}
                            defaultValue={props.sheet.InterviewMid1Date || ""}
                        />
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid1Date || ""), "yyyy/mm/dd")}</td> */}
                    <td>
                        <textarea
                            className={style.detailTextarea}
                            name="InterviewMid1Comment" 
                            onChange={props.handleChange}
                        >
                            {props.sheet.InterviewMid1Comment}
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td>中間#2</td>
                    <td>
                        <input
                            type="date"
                            name="InterviewMid2Date"
                            onChange={props.handleChange}
                            defaultValue={props.sheet.InterviewMid2Date || ""}
                        />
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid2Date || ""), "yyyy/mm/dd")}</td> */}
                    <td>
                        <textarea
                            className={style.detailTextarea}
                            name="InterviewMid2Comment" 
                            onChange={props.handleChange}
                        >
                            {props.sheet.InterviewMid2Comment}
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td>中間#3</td>
                    <td>
                        <input
                            type="date"
                            name="InterviewMid3Date"
                            onChange={props.handleChange}
                            defaultValue={props.sheet.InterviewMid3Date || ""}
                        />
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid3Date || ""), "yyyy/mm/dd")}</td> */}
                    <td>
                        <textarea
                            className={style.detailTextarea}
                            name="InterviewMid3Comment" 
                            onChange={props.handleChange}
                        >
                            {props.sheet.InterviewMid3Comment}
                        </textarea>
                    </td>
                </tr>
            </tbody>

        </Table>
}