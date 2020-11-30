import { Sheet } from "App"
import { textareaDisplayStyle } from "common/globalStyle.module.scss";
import React from "react"
import { Form } from "react-bootstrap";
import style from '../common/style.module.scss';

type Props = {
    handleChange: (e: React.ChangeEvent<any>)=> void,
    sheet: Sheet
}
export const ReviewerSheetDetailCareerEditable = (props: Props)=>{
    return <div>
        <h4>本人希望</h4>
        {/* 本人希望　情報表示 */}
        <p className={textareaDisplayStyle}>{props.sheet.careerPlan}</p>


        <h4>話し合い結果</h4>
        <Form.Control
            as="textarea"
            className={style.detailTextarea}
            name="careerPlanComment"
            onChange={props.handleChange}
        >
            {props.sheet.careerPlanComment}
        </Form.Control>
    </div>
}