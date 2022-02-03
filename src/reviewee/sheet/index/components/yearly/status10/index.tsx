import {
  tableHeaderStyle,
  textareaDisplayStyle,
} from "common/globalStyle.module.scss";
import React from "react";
import { Table } from "react-bootstrap";

export const YearlyTableStatus10 = (): JSX.Element => {
  return (
    <Table bordered hover>
      <thead className={tableHeaderStyle}>
        <tr>
          <td>■所属長コメント</td>
          <td>日付</td>
          <td>■部門長コメント</td>
          <td>日付</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={textareaDisplayStyle}>なし</td>
          <td>-</td>
          <td className={textareaDisplayStyle}>なし</td>
          <td>-</td>
        </tr>
      </tbody>
    </Table>
  );
};
