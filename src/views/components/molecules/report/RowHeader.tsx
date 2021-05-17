import React from "react";
import TableHeaderCell from "views/components/atoms/TableHeaderCell";

export default function () {
  return (
    <tr>
      <TableHeaderCell>報告日</TableHeaderCell>
      <TableHeaderCell>作業内容</TableHeaderCell>
      <TableHeaderCell>作業状況詳細</TableHeaderCell>
      <TableHeaderCell>その他</TableHeaderCell>
      <TableHeaderCell>所属長コメント</TableHeaderCell>
    </tr>
  );
}
