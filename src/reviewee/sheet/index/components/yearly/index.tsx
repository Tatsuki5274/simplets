import {
  tableHeaderStyle,
  textareaDisplayStyle,
} from "common/globalStyle.module.scss";
import { formatSheetCheckDate } from "lib/util";
import React from "react";
import { Table } from "react-bootstrap";

type Props = {
  secondComment: string | null;
  secondCheckDate: string | null;
  firstComment: string | null;
  firstCheckDate: string | null;
};

export const YearlyTable = (props: Props) => {
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
          <td className={textareaDisplayStyle}>
            {props.secondComment || "なし"}
          </td>
          <td>
            {props.secondCheckDate
              ? formatSheetCheckDate(props.secondCheckDate)
              : "-"}
          </td>
          <td className={textareaDisplayStyle}>
            {props.firstComment || "なし"}
          </td>
          <td>
            {props.firstCheckDate
              ? formatSheetCheckDate(props.firstCheckDate)
              : "-"}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
