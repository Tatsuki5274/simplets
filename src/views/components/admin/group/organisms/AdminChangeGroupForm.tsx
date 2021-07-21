import { UpdateGroupInput } from "API";
import { ErrorContext } from "App";
import { Formik } from "formik";
import { updateGroupByCompanyAdmin } from "graphql/mutations";
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
  groupNo: string;
  groupName: string;
  id: string;
};

export default function (props: Props) {
  const setError = useContext(ErrorContext);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        groupName: props.groupName,
      }}
      onSubmit={async (values) => {
        const updateI: UpdateGroupInput = {
          id: props.id,
          companyID: props.companyId,
          no: props.groupNo,
          name: values.groupName,
        };
        const updateItem = await GroupDao.updateByAdmin(
          updateGroupByCompanyAdmin,
          updateI
        );
        if (updateItem) {
          window.alert("部署情報の更新が完了しました");
          history.push(routeBuilder.adminGroupListPath());
        } else {
          setError("部署情報の更新に失敗しました");
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tr>
              <td>
                <Text>部署番号</Text>
              </td>
              <td>
                <Text>{props.groupNo}</Text>
              </td>
            </tr>

            <tr>
              <td>
                <Text>部署名</Text>
              </td>
              <td>
                <TextField
                  name="groupName"
                  onChange={formik.handleChange}
                  defaultValue={formik.initialValues.groupName}
                />
              </td>
            </tr>

            <CommandButton type="submit">部署変更</CommandButton>

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
