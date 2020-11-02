import { Sheet } from "App"
import React from "react"
import { Form } from "react-bootstrap"
import style from '../../common/style.module.scss';


type Props = {
    handleChange: (e: React.ChangeEvent<any>)=> void,
    sheet: Sheet
}
export const ReviewerSheetDetailYearlyEditableTop = (props: Props) => {
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
                onChange={props.handleChange}
                name="overAllEvaluation"
                as="select">
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
            <Form.Control
                as="textarea"
                className={style.detailTextarea}
                onChange={props.handleChange}
                name="firstComment"
                defaultValue={props.sheet.firstComment || ""}>
            </Form.Control>
        </Form.Group>

    </div>
}