import { Sheet } from "API";
import { ErrorMessage } from "formik";
import React from "react";
import { Badge, Form, Table } from "react-bootstrap";
import ErrorText from "views/components/common/atoms/ErrorText";
import style from "../../common/style.module.scss";

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLElement>) => void;
  sheet: Sheet;
};
export const ReviewerSheetDetailYearlyEditableTop = (props: Props) => {
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
                <Form.Label>
                  部門長コメント<Badge variant="danger">必須</Badge>
                </Form.Label>
              </td>
              <td className={style.yearlyEditableInputStyle}>
                <Form.Control
                  as="textarea"
                  className={style.detailTextarea}
                  onChange={props.handleChange}
                  name="firstComment"
                  defaultValue={props.sheet.firstComment || ""}
                ></Form.Control>
                <ErrorText>
                  <ErrorMessage name="firstComment" />
                </ErrorText>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form.Group>
    </div>
  );
};
