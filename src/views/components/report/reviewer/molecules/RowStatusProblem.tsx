import React from "react";
import StyledTableBodyCell from "views/components/common/atoms/StyledTableBodyCell";
import CellStatusProblem from "../atoms/CellStatusProblem";

type Props = {
  // date: Date
  date: string;
  commentWork: string;
  commentStatus: string;
  commentOther: string;
  commentSuperior: string;
};

export default function (props: Props) {
  return (
    <tr>
      <CellStatusProblem>{props.date}</CellStatusProblem>
      <StyledTableBodyCell>{props.commentWork}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentStatus}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentOther}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentSuperior}</StyledTableBodyCell>
    </tr>
  );
}
