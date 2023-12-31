import React from "react";
import StyledTableBodyCell from "views/components/common/atoms/StyledTableBodyCell";
import CellStatusInTask from "views/components/report/reviewer/atoms/CellStatusInTask";

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
      <CellStatusInTask>{props.date}</CellStatusInTask>
      <StyledTableBodyCell>{props.commentWork}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentStatus}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentOther}</StyledTableBodyCell>
      <StyledTableBodyCell>{props.commentSuperior}</StyledTableBodyCell>
    </tr>
  );
}
