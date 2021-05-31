import dateFormat from "dateformat";
import React from "react";
import { Table } from "react-bootstrap";
import TableBodyCell from "views/components/common/atoms/TableBodyCell";
import TableHeaderCell from "views/components/common/atoms/TableHeaderCell";

type Props = {
  interviewPlanDate: string | null;
  interviewPlanComment: string | null;
  InterviewMid1Date: string | null;
  InterviewMid1Comment: string | null;
  InterviewMid2Date: string | null;
  InterviewMid2Comment: string | null;
  InterviewMid3Date: string | null;
  InterviewMid3Comment: string | null;
};

export default function (props: Props) {
  const format = "yyyy/mm/dd";
  let interviewPlanDate: string | null = null;
  if (props.interviewPlanDate) {
    interviewPlanDate = dateFormat(props.interviewPlanDate, format);
  }
  let InterviewMid1Date: string | null = null;
  if (props.InterviewMid1Date) {
    InterviewMid1Date = dateFormat(props.InterviewMid1Date, format);
  }
  let InterviewMid2Date: string | null = null;
  if (props.InterviewMid2Date) {
    InterviewMid2Date = dateFormat(props.InterviewMid2Date, format);
  }
  let InterviewMid3Date: string | null = null;
  if (props.InterviewMid3Date) {
    InterviewMid3Date = dateFormat(props.InterviewMid3Date, format);
  }

  return (
    <Table bordered hover>
      <tr>
        <TableHeaderCell>目的</TableHeaderCell>
        <TableHeaderCell>実施日時</TableHeaderCell>
        <TableHeaderCell>内容</TableHeaderCell>
      </tr>
      <tr>
        <TableBodyCell>目標設定</TableBodyCell>
        <TableBodyCell>{interviewPlanDate || ""}</TableBodyCell>
        <TableBodyCell>{props.interviewPlanComment || ""}</TableBodyCell>
      </tr>
      <tr>
        <TableBodyCell>中間#1</TableBodyCell>
        <TableBodyCell>{InterviewMid1Date || ""}</TableBodyCell>
        <TableBodyCell>{props.InterviewMid1Comment || ""}</TableBodyCell>
      </tr>
      <tr>
        <TableBodyCell>中間#2</TableBodyCell>
        <TableBodyCell>{InterviewMid2Date || ""}</TableBodyCell>
        <TableBodyCell>{props.InterviewMid2Comment || ""}</TableBodyCell>
      </tr>
      <tr>
        <TableBodyCell>中間#3</TableBodyCell>
        <TableBodyCell>{InterviewMid3Date || ""}</TableBodyCell>
        <TableBodyCell>{props.InterviewMid3Comment || ""}</TableBodyCell>
      </tr>
    </Table>
  );
}
