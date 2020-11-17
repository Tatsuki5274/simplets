import React from "react"
import { Table } from "react-bootstrap"

type Props = {
    secondComment: string | null,
    secondCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null
}

export const YearlyTable = (props: Props) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>■所属長コメント</td>
                    <td>日付</td>
                    <td>■部門長コメント</td>
                    <td>日付</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.secondComment || "なし"}</td>
                    <td>{props.secondCheckDate?.replace(/-/g,'/') || "-"}</td>
                    <td>{props.firstComment || "なし"}</td>
                    <td>{props.firstCheckDate?.replace(/-/g,'/') || "-"}</td>
                </tr>
            </tbody>
        </Table>
    )
}