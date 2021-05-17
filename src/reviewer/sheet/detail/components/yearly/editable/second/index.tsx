import { Sheet } from "API";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import { ErrorMessage } from "formik";
import React from "react";
import { Badge, Form, Table } from "react-bootstrap";
import ErrorText from "views/components/atoms/ErrorText";
import style from "../../common/style.module.scss";

type Props = {
  handleChange: (e: React.ChangeEvent<any>) => void;
  sheet: Sheet;
};
export const ReviewerSheetDetailYearlyEditableSecond = (props: Props) => {
  return (
    <div>
      <Form.Group>
        <Table bordered>
          <thead></thead>
          <tbody>
            <tr>
              <td className={style.yearlyLabelStyle}>
                <Form.Label>
                  所属長コメント<Badge variant="danger">必須</Badge>
                </Form.Label>
              </td>
              <td className={style.yearlyEditableInputStyle}>
                <Form.Control
                  as="textarea"
                  className={style.detailTextarea}
                  onChange={props.handleChange}
                  name="secondComment"
                  defaultValue={props.sheet.secondComment || ""}
                ></Form.Control>
                <ErrorText>
                  <ErrorMessage name="secondComment" />
                </ErrorText>
              </td>
            </tr>
            <tr>
              <td className={style.yearlyLabelStyle}>
                <Form.Label>
                  総合評価<Badge variant="danger">必須</Badge>
                </Form.Label>
              </td>
              <td className={style.yearlyEditableInputStyle}>
                <Form.Control
                  as="select"
                  name="overAllEvaluation"
                  onChange={props.handleChange}
                  defaultValue={props.sheet.overAllEvaluation || ""}
                  className={inputFieldStyle}
                >
                  <option></option>
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </Form.Control>
                <ErrorText>
                  <ErrorMessage name="overAllEvaluation" />
                </ErrorText>
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
