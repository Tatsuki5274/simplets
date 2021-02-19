import React from "react";
import CellStatusProblem from "views/components/atoms/CellStatusProblem";

type Props = {
    // date: Date
    date: string
    commentWork: string
    commentStatus: string
    commentOther: string
    commentSuperior: string
}

export default function (props: Props) {
    return (
        <tr>
            <CellStatusProblem>{props.date}</CellStatusProblem>
            <td>{props.commentStatus}</td>
            <td>{props.commentWork}</td>
            <td>{props.commentOther}</td>
            <td>{props.commentSuperior}</td>
        </tr>
    )
}