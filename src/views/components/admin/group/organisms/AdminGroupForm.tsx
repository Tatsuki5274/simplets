import { CreateGroupInput } from "API";
import { ErrorContext } from "App";
import { Formik } from "formik";
import { createGroupByCompanyAdmin } from "graphql/mutations";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/common/atoms/Button";
import Text from "views/components/common/atoms/Text";
import TextField from "views/components/common/atoms/TextField";
import CommandButton from "views/components/common/molecules/CommandButton";

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
        const createI: CreateGroupInput = {
          companyID: props.companyId,
          no: values.localID,
          name: values.name,
        };
        const groupItem = await GroupDao.createByAdmin(
          createGroupByCompanyAdmin,
          createI
        );
        if (groupItem) {
          window.alert("部署登録が完了しました");
          history.push(routeBuilder.adminGroupListPath());
        } else {
          setError("部署登録に失敗しました");
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tr>
              <td>
                <Text>部署ID</Text>
              </td>
              <td>
                <TextField name="localID" onChange={formik.handleChange} />
              </td>
            </tr>

            <tr>
              <td>
                <Text>部署名</Text>
              </td>
              <td>
                <TextField name="name" onChange={formik.handleChange} />
              </td>
            </tr>

            <CommandButton type="submit">部署登録</CommandButton>

            <SpaceStyle>
              <Button href={routeBuilder.adminGroupListPath()}>
                キャンセル
              </Button>
            </SpaceStyle>
          </table>
        </form>
      )}
    </Formik>
  );
}

const SpaceStyle = styled.div({
  display: "inline-block",
  margin: "0 10px",
});
