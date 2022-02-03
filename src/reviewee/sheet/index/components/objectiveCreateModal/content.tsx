import React, { CSSProperties } from "react";
import { Form, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryInput from "./categoryInput";
import { ErrorMessage, FormikProps } from "formik";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import { TypeForm } from ".";
import { Sheet } from "API";
import ErrorText from "views/components/common/atoms/ErrorText";

type Props = {
  year: number;
  sheet: Sheet;
  defaultSectionKeys: string;
  formik: FormikProps<TypeForm>;
};

export function ObjectiveCreateModalContent(props: Props): JSX.Element {
  return (
    <>
      <div>
        <Form.Label>
          目標カテゴリ<Badge variant="danger">必須</Badge>
        </Form.Label>
        {props.sheet.section?.items?.map((section, index) => {
          if (section && section.sectionCategoryName && section.id) {
            return (
              <CategoryInput
                key={section.no + section.id}
                handleChange={props.formik.handleChange}
                sectionKeys={section.id}
                categoryName={section.sectionCategoryName}
                defaultCheck={index === 0}
                style={categoryInputStyle}
              ></CategoryInput>
            );
          } else {
            // Todo エラー出力の追加
            //console.log("エラー: カテゴリが設定されていない可能性があります。");
          }
        })}
        <p>
          <ErrorText>
            <ErrorMessage name="sectionKeys" />
          </ErrorText>
        </p>
      </div>
      <Form.Label>
        目標内容<Badge variant="danger">必須</Badge>
      </Form.Label>
      <Form.Control
        as="textarea"
        name="content"
        onChange={props.formik.handleChange}
        className={inputFieldStyle}
      />
      <p>
        <ErrorText>
          <ErrorMessage name="content" />
        </ErrorText>
      </p>

      <Form.Label>
        優先順位<Badge variant="danger">必須</Badge>
      </Form.Label>
      <Form.Control
        as="select"
        name="priority"
        onChange={props.formik.handleChange}
        style={priorityStyle}
        className={inputFieldStyle}
      >
        <option></option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Form.Control>
      <p>
        <ErrorText>
          <ErrorMessage name="priority" />
        </ErrorText>
      </p>

      <Form.Label>
        開始予定日<Badge variant="danger">必須</Badge>
      </Form.Label>
      <Form.Control
        //required
        type="date"
        name="expStartDate"
        onChange={props.formik.handleChange}
        className={inputFieldStyle}
        style={expDateInputStyle}
        placeholder={"yyyy-mm-dd"}
      />
      <p>
        <ErrorText>
          <ErrorMessage name="expStartDate" />
        </ErrorText>
      </p>

      <Form.Label>
        完了予定日<Badge variant="danger">必須</Badge>
      </Form.Label>
      <Form.Control
        //required
        type="date"
        name="expDoneDate"
        onChange={props.formik.handleChange}
        className={inputFieldStyle}
        style={expDateInputStyle}
        placeholder={"yyyy-mm-dd"}
      />
      <p>
        <ErrorText>
          <ErrorMessage name="expDoneDate" />
        </ErrorText>
      </p>
      <p>
        ※使用しているブラウザがSafariの場合、開始予定日と完了予定日は yyyy-mm-dd
        形式で入力してください
      </p>
      <p>例：2020年1月1日 → 2020-01-01</p>
    </>
  );
}

const priorityStyle: CSSProperties = {
  width: "100px",
};
const categoryInputStyle: CSSProperties = {
  fontSize: "24px",
  lineHeight: "40px",
  display: "inline",
};
const expDateInputStyle: CSSProperties = {
  width: "170px",
};
