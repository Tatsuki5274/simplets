import { DeleteCategoryInput, UpdateCategoryInput } from "API";
import { ErrorContext } from "App";
import { Formik } from "formik";
import {
  deleteCategoryByCompanyAdmin,
  updateCategoryByCompanyAdmin,
} from "graphql/mutations";
import { CategoryDao } from "lib/dao/categoryDao";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/common/atoms/Button";
import Text from "views/components/common/atoms/Text";
import TextField from "views/components/common/atoms/TextField";
import ButtonNegative from "views/components/common/molecules/ButtonNegative";
import CommandButton from "views/components/common/molecules/CommandButton";

export type AdminCategoryEditDataType = {
  companyId: string;
  localId: string;
  name: string;
  id: string;
};

type Props = AdminCategoryEditDataType;

export default function (props: Props) {
  const setError = useContext(ErrorContext);
  const history = useHistory();
  const onClickDelete = async () => {
    if (window.confirm("削除してよろしいですか？")) {
      const deleteI: DeleteCategoryInput = {
        id: props.id,
        // companyID: props.companyId,
        // localID: props.categoryLocalId,
      };
      const deleteItem = await CategoryDao.deleteByAdmin(
        deleteCategoryByCompanyAdmin,
        deleteI
      );
      if (!deleteItem) {
        setError("カテゴリ情報の取得に失敗しました");
        return;
      }
      window.alert("カテゴリ内容の削除が完了しました");
      history.push(routeBuilder.adminCategoryListPath());
    }
  };

  return (
    <Formik
      initialValues={{
        name: props.name,
      }}
      onSubmit={async (values) => {
        const updateI: UpdateCategoryInput = {
          id: props.id,
          companyID: props.companyId,
          no: props.localId,
          name: values.name,
        };
        const updateItems = await CategoryDao.updateByAdmin(
          updateCategoryByCompanyAdmin,
          updateI
        );
        if (updateItems) {
          window.alert("カテゴリ内容の変更が完了しました");
          history.push(routeBuilder.adminCategoryListPath());
        } else {
          setError("カテゴリ内容の変更に失敗しました");
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
                <Text>{props.localId}</Text>
              </td>
            </tr>

            <tr>
              <td>
                <Text>カテゴリ内容</Text>
              </td>
              <td>
                <TextField
                  name="name"
                  onChange={formik.handleChange}
                  defaultValue={formik.initialValues.name}
                />
              </td>
            </tr>

            <CommandButton type="submit">変更</CommandButton>

            <SpaceStyle>
              <Button href={routeBuilder.adminCategoryListPath()}>
                キャンセル
              </Button>
            </SpaceStyle>
          </table>
          <ButtonNegative onClick={onClickDelete}>削除</ButtonNegative>
          <p>
            ※変更したカテゴリ内容は作成済みの業績評価シートには適用されず、カテゴリ内容変更後に作成したシートにのみ適用されます。
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
