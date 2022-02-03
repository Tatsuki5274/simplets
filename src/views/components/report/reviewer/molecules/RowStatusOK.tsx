import React from "react";
import StyledTableBodyCell from "views/components/common/atoms/StyledTableBodyCell";
import CellStatusOK from "../atoms/CellStatusOK";

type Props = {
  // date: Date
  date: string;
  commentWork: string;
  commentStatus: string;
  commentOther: string;
  commentSuperior: string;
};

export default function (props: Props): JSX.Element {
  return (
    <tr>
      <CellStatusOK>{props.date}</CellStatusOK>
      <StyledTableBodyCell>{props.commentWork}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentStatus}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentOther}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentSuperior}</StyledTableBodyCell>
    </tr>
  );
}
