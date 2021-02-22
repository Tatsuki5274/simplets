import React from "react";
import CellStatusInTask from "views/components/atoms/CellStatusInTask";

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
            <CellStatusInTask>{props.date}</CellStatusInTask>
            <td>{props.commentStatus}</td>
            <td>{props.commentWork}</td>
            <td>{props.commentOther}</td>
            <td>{props.commentSuperior}</td>
        </tr>
    )
}