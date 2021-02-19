import React from "react";
import TableHeaderCell from "views/components/atoms/TableHeaderCell";

export default function () {
    return (
        <tr>
            <TableHeaderCell>報告日</TableHeaderCell>
            <TableHeaderCell>作業報告</TableHeaderCell>
            <TableHeaderCell>作業コメント</TableHeaderCell>
            <TableHeaderCell>その他コメント</TableHeaderCell>
            <TableHeaderCell>所属長コメント</TableHeaderCell>
        </tr>
    )
}