import { Sheet } from "App"
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
            <div>{props.sheet.overAllEvaluation || "未設定"}</div>
        </Form.Group>

        <Form.Group>
            <Form.Label>部門長コメント</Form.Label>
            <div>{props.sheet.firstComment || "未入力"}</div>
        </Form.Group>

    </div>
}