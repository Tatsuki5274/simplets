import { Sheet } from "App"
import React from "react"
import { Form, Table } from "react-bootstrap"

type Props = {
    sheet: Sheet
}
export const ReviewerSheetDetailYearlyReadonly = (props: Props) => {
    return <div>
        <Form.Group>
            <Table bordered>
                <thead></thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Label>所属長コメント</Form.Label>
                        </td>
                        <td>
                            <div>{props.sheet.secondComment || "未設定"}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Label>総合評価</Form.Label>
                        </td>
                        <td>
                            <div>{props.sheet.overAllEvaluation || "未設定"}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Label>部門長コメント</Form.Label>
                        </td>
                        <td>
                            <div>{props.sheet.firstComment || "未入力"}</div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Form.Group>
    </div>
}