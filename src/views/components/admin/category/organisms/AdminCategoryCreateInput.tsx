import { CreateCategoryInput } from "API";
import { ErrorContext } from "App";
import { Formik, ErrorMessage } from "formik";
import { createCategoryByCompanyAdmin } from "graphql/mutations";
import { CategoryDao } from "lib/dao/categoryDao";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/common/atoms/Button";
import ErrorText from "views/components/common/atoms/ErrorText";
import Text from "views/components/common/atoms/Text";
import TextField from "views/components/common/atoms/TextField";
import CommandButton from "views/components/common/molecules/CommandButton";
import * as Yup from "yup";

type Props = {
  companyId: string;
};

export default function (props: Props): JSX.Element {
  const setError = useContext(ErrorContext);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        localID: "",
        name: "",
      }}
      validationSchema={Yup.object({
        localID: Yup.string().required("カテゴリIDを入力してください"),
        name: Yup.string().required("カテゴリ内容を入力してください"),
      })}
      onSubmit={async (values) => {
        const createI: CreateCategoryInput = {
          companyID: props.companyId,
          no: values.localID,
          name: values.name,
        };
        const category = await CategoryDao.createByAdmin(
          createCategoryByCompanyAdmin,
          createI
        );

        if (category) {
          window.alert("カテゴリ内容が作成されました");
          history.push(routeBuilder.adminCategoryListPath());
        } else {
          setError("カテゴリ内容の作成に失敗しました");
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tr>
              <td>
                <Text>カテゴリID</Text>
              </td>
              <td>
                <TextField name="localID" onChange={formik.handleChange} />
                <ErrorText>
                  <ErrorMessage name="localID" />
                </ErrorText>
              </td>
            </tr>

            <tr>
              <td>
                <Text>カテゴリ内容</Text>
              </td>
              <td>
                <TextField name="name" onChange={formik.handleChange} />
                <ErrorText>
                  <ErrorMessage name="name" />
                </ErrorText>
              </td>
            </tr>

            <CommandButton type="submit">新規作成</CommandButton>

            <SpaceStyle>
              <Button href={routeBuilder.adminCategoryListPath()}>
                キャンセル
              </Button>
            </SpaceStyle>
          </table>

          <p>
            ※新規作成したカテゴリは作成済みの業績評価シートには適用されず、カテゴリ新規作成後に作成したシートにのみ適用されます。
          </p>
        </form>
      )}
    </Formik>
  );
}

const SpaceStyle = styled.div({
  display: "inline-block",
  margin: "0 10px",
});
