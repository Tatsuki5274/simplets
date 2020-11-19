import { Sheet } from "App"
import { inputFieldStyle } from "common/globalStyle.module.scss";
import React from "react"
import { Form } from "react-bootstrap"
import style from '../../common/style.module.scss';


type Props = {
    handleChange: (e: React.ChangeEvent<any>)=> void,
    sheet: Sheet
}
export const ReviewerSheetDetailYearlyEditableSecond = (props: Props) => {
    return <div>
        <Form.Group>
            <Form.Label>所属長コメント</Form.Label>
            <Form.Control
                as="textarea"
                className={style.detailTextarea}
                onChange={props.handleChange}
                name="secondComment"
                defaultValue={props.sheet.secondComment || ""}>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>総合評価</Form.Label>
            <Form.Control
                as="select"
                name="overAllEvaluation"
                onChange={props.handleChange}
                defaultValue={props.sheet.overAllEvaluation || ""}
                className={inputFieldStyle}>
                <option></option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>部門長コメント</Form.Label>
            <div>{props.sheet.firstComment || "未入力"}</div>
        </Form.Group>

    </div>
}