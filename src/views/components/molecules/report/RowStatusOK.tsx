import React from "react";
import CellStatusOK from "views/components/atoms/CellStatusOK";

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
            <CellStatusOK>{props.date}</CellStatusOK>
            <td>{props.commentStatus}</td>
            <td>{props.commentWork}</td>
            <td>{props.commentOther}</td>
            <td>{props.commentSuperior}</td>
        </tr>
    )
}