import React from "react";
import CellStatusProblem from "views/components/atoms/CellStatusProblem";
import StyledTableBodyCell from "views/components/atoms/StyledTableBodyCell";

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
            <StyledTableBodyCell>{props.commentStatus}</StyledTableBodyCell>
            <StyledTableBodyCell>{props.commentWork}</StyledTableBodyCell>
            <StyledTableBodyCell>{props.commentOther}</StyledTableBodyCell>
            <StyledTableBodyCell>{props.commentSuperior}</StyledTableBodyCell>
        </tr>
    )
}