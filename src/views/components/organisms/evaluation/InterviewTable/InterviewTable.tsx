import React from "react";
import { Table } from "react-bootstrap";
import TableBodyCell from "views/components/molecules/TableBodyCell";
import TableHeaderCell from "views/components/molecules/TableHeaderCell";

type Props = {
    interviewPlanDate: string | null
    interviewPlanComment: string | null
    InterviewMid1Date: string | null
    InterviewMid1Comment: string | null
    InterviewMid2Date: string | null
    InterviewMid2Comment: string | null
    InterviewMid3Date: string | null
    InterviewMid3Comment: string | null
}

export default function(props: Props){
    return (
        <Table bordered hover>
            <tr>
                <TableHeaderCell>目的</TableHeaderCell>
                <TableHeaderCell>実施日時</TableHeaderCell>
                <TableHeaderCell>内容</TableHeaderCell>
            </tr>
            <tr>
                <TableBodyCell>目標設定</TableBodyCell>
                <TableBodyCell>{props.interviewPlanDate || ""}</TableBodyCell>
                <TableBodyCell>{props.interviewPlanComment || ""}</TableBodyCell>
            </tr>
            <tr>
                <TableBodyCell>中間#1</TableBodyCell>
                <TableBodyCell>{props.InterviewMid1Date || ""}</TableBodyCell>
                <TableBodyCell>{props.InterviewMid1Comment || ""}</TableBodyCell>
            </tr>
            <tr>
                <TableBodyCell>中間#2</TableBodyCell>
                <TableBodyCell>{props.InterviewMid2Date || ""}</TableBodyCell>
                <TableBodyCell>{props.InterviewMid2Comment || ""}</TableBodyCell>
            </tr>
            <tr>
                <TableBodyCell>中間#3</TableBodyCell>
                <TableBodyCell>{props.InterviewMid3Date || ""}</TableBodyCell>
                <TableBodyCell>{props.InterviewMid3Comment || ""}</TableBodyCell>
            </tr>
        </Table>
    )
}