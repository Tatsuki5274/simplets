import { CreateCategoryInput } from "API";
import { ErrorContext } from "App";
import { Formik } from "formik";
import { createCategory } from "graphql/mutations";
import { CategoryDao } from "lib/dao/categoryDao";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/atoms/Button";
import Text from "views/components/atoms/Text";
import TextField from "views/components/atoms/TextField";
import CommandButton from "views/components/molecules/CommandButton";

type Props = {
  companyId: string;
};

export default function (props: Props) {
  const setError = useContext(ErrorContext);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        localID: "",
        name: "",
      }}
      onSubmit={async (values) => {
        const createI: CreateCategoryInput = {
          companyID: props.companyId,
          no: values.localID,
          name: values.name,
        };
        const category = await CategoryDao.create(createCategory, createI);

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
              </td>
            </tr>

            <tr>
              <td>
                <Text>カテゴリ内容</Text>
              </td>
              <td>
                <TextField name="name" onChange={formik.handleChange} />
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
