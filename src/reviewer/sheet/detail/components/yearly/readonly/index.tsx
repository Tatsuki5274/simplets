import { Sheet } from "API";
import React from "react";
import { Form, Table } from "react-bootstrap";
import style from "../common/style.module.scss";

type Props = {
  sheet: Sheet;
};
export const ReviewerSheetDetailYearlyReadonly = (
  props: Props
): JSX.Element => {
  return (
    <div>
      <Form.Group>
        <Table bordered>
          <thead></thead>
          <tbody>
            <tr>
              <td className={style.yearlyLabelStyle}>
                <Form.Label>所属長コメント</Form.Label>
              </td>
              <td className={style.yearlyReadonlyInputStyle}>
                <div>{props.sheet.secondComment || "未設定"}</div>
              </td>
            </tr>
            <tr>
              <td className={style.yearlyLabelStyle}>
                <Form.Label>総合評価</Form.Label>
              </td>
              <td className={style.yearlyReadonlyInputStyle}>
                <div>{props.sheet.overAllEvaluation || "未設定"}</div>
              </td>
            </tr>
            <tr>
              <td className={style.yearlyLabelStyle}>
                <Form.Label>部門長コメント</Form.Label>
              </td>
              <td className={style.yearlyReadonlyInputStyle}>
                <div>{props.sheet.firstComment || "未入力"}</div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form.Group>
    </div>
  );
};
