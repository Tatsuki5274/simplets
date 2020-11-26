import { Sheet } from "App"
import React from "react"
import { Form, Table } from "react-bootstrap"
import style from '../common/style.module.scss';

type Props = {
    handleChange: (e: React.ChangeEvent<any>)=> void,
    sheet: Sheet
}

export const ReviewerSheetDetailInterviewEditable = (props: Props)=>{
    return <Table bordered striped>
            <thead>
                <tr>
                    <td className={style.interviewPurposeTableStyle}>目的</td>
                    <td className={style.interviewPlanDateTableStyle}>実施日時</td>
                    <td className={style.interviewPlanCommentTableStyle}>内容</td>
                </tr>
            </thead>
            <tbody>
                {/* インタビュー実施記録　情報表示 */}
                <tr>
                    <td className={style.interviewPurposeTableStyle}>目標設定</td>
                    <td className={style.interviewPlanDateTableStyle}>
                        <input
                            type="date"
                            name="interviewPlanDate"
                            onChange={props.handleChange}
                            defaultValue={props.sheet.interviewPlanDate || ""}
                        />
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.interviewPlanDate || ""), "yyyy/mm/dd")}</td> */}
                    <td className={style.interviewPlanCommentTableStyle}>
                        <Form.Control
                            as="textarea"
                            className={style.detailTextarea}
                            name="interviewPlanComment" 
                            onChange={props.handleChange}
                        >
                            {props.sheet.interviewPlanComment}
                        </Form.Control>
                    </td>
                </tr>
                <tr>
                    <td className={style.interviewPurposeTableStyle}>中間#1</td>
                    <td className={style.interviewPlanDateTableStyle}>
                        <input
                            type="date"
                            name="InterviewMid1Date"
                            onChange={props.handleChange}
                            defaultValue={props.sheet.InterviewMid1Date || ""}
                        />
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid1Date || ""), "yyyy/mm/dd")}</td> */}
                    <td className={style.interviewPlanCommentTableStyle}>
                        <Form.Control
                            as="textarea"
                            className={style.detailTextarea}
                            name="InterviewMid1Comment" 
                            onChange={props.handleChange}
                        >
                            {props.sheet.InterviewMid1Comment}
                        </Form.Control>
                    </td>
                </tr>
                <tr>
                    <td className={style.interviewPurposeTableStyle}>中間#2</td>
                    <td className={style.interviewPlanDateTableStyle}>
                        <input
                            type="date"
                            name="InterviewMid2Date"
                            onChange={props.handleChange}
                            defaultValue={props.sheet.InterviewMid2Date || ""}
                        />
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid2Date || ""), "yyyy/mm/dd")}</td> */}
                    <td className={style.interviewPlanCommentTableStyle}>
                        <Form.Control
                            as="textarea"
                            className={style.detailTextarea}
                            name="InterviewMid2Comment" 
                            onChange={props.handleChange}
                        >
                            {props.sheet.InterviewMid2Comment}
                        </Form.Control>
                    </td>
                </tr>
                <tr>
                    <td className={style.interviewPurposeTableStyle}>中間#3</td>
                    <td className={style.interviewPlanDateTableStyle}>
                        <input
                            type="date"
                            name="InterviewMid3Date"
                            onChange={props.handleChange}
                            defaultValue={props.sheet.InterviewMid3Date || ""}
                        />
                    </td>
                    {/* <td>{dateFormat(new Date(sheet.InterviewMid3Date || ""), "yyyy/mm/dd")}</td> */}
                    <td className={style.interviewPlanCommentTableStyle}>
                        <Form.Control
                            as="textarea"
                            className={style.detailTextarea}
                            name="InterviewMid3Comment" 
                            onChange={props.handleChange}
                        >
                            {props.sheet.InterviewMid3Comment}
                        </Form.Control>
                    </td>
                </tr>
            </tbody>

        </Table>
}