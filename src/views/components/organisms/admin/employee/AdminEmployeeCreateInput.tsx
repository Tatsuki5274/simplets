import {
  BooleanType,
  CreateEmployeeInput,
  EmployeeType,
  GetEmployeeQueryVariables,
  ListEmployeesCompanyQueryVariables,
} from "API";
import { ErrorContext } from "App";
import { ErrorMessage, Formik } from "formik";
import { createEmployee } from "graphql/mutations";
import { getEmployee, listEmployeesCompany } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/atoms/Button";
import ErrorText from "views/components/atoms/ErrorText";
import Text from "views/components/atoms/Text";
import TextField from "views/components/atoms/TextField";
import { SelectLabel } from "views/components/atoms/Types";
import CommandButton from "views/components/molecules/CommandButton";
import PullDown from "views/components/molecules/PullDown";
import * as Yup from "yup";

type Props = {
  groups: SelectLabel[];
  superiors: SelectLabel[];
  isAdmin: {
    label: string;
    value: string;
  }[];
  manager: {
    label: string;
    value: string;
  }[];
  companyId: string;
};

export default function (props: Props) {
  const history = useHistory();
  const setError = useContext(ErrorContext);

  return (
    <Formik
      initialValues={{
        localID: "",
        lastName: "",
        firstName: "",
        groupList: props.groups[0].value,
        email: "",
        grade: "",
        superiorList: props.superiors ? props.superiors[0].value : "",
        isAdmin: props.isAdmin[0].value,
        manager: props.manager[0].value,
      }}
      validationSchema={Yup.object({
        localID: Yup.string().required("社員番号を入力してください"),
        lastName: Yup.string().required("姓を入力してください"),
        firstName: Yup.string().required("名を入力してください"),
        groupList: Yup.string().required("所属部署を選択してください"),
        email: Yup.string().required("メールアドレスを入力してください"),
        grade: Yup.string().required("等級を入力してください"),
        isAdmin: Yup.string().required("マスター管理を選択してください"),
        manager: Yup.string().required("参照権限を選択してください"),
      })}
      onSubmit={async (values) => {
        // console.log("values", values)

        // 社員番号の重複確認
        const listI: ListEmployeesCompanyQueryVariables = {
          companyID: props.companyId,
          no: {
            eq: values.localID,
          },
        };
        const listItem = await EmployeeDao.listCompany(
          listEmployeesCompany,
          listI
        );
        if (listItem) {
          if (listItem.length === 0) {
            // メールアドレスの重複確認
            const getI: GetEmployeeQueryVariables = {
              username: values.email,
            };
            const getItem = await EmployeeDao.get(getEmployee, getI);
            if (!getItem) {
              if (window.confirm("社員登録を行いますか？")) {
                const createI: CreateEmployeeInput = {
                  companyID: props.companyId,
                  email: values.email,
                  groupID: values.groupList,
                  firstName: values.firstName,
                  grade: values.grade,
                  isDeleted: BooleanType.FALSE,
                  lastName: values.lastName,
                  no: values.localID,
                  manager:
                    values.manager === "NORMAL"
                      ? EmployeeType.NORMAL
                      : values.manager === "MANAGER"
                      ? EmployeeType.MANAGER
                      : values.manager === "SUPER_MANAGER"
                      ? EmployeeType.SUPER_MANAGER
                      : EmployeeType.OTHER,
                  superiorUsername: values.superiorList,
                  username: values.email,
                  isCompanyAdmin: values.isAdmin === "true" ? true : false,
                };
                const createItem = await EmployeeDao.create(
                  createEmployee,
                  createI
                );
                if (createItem) {
                  window.confirm("社員情報の登録が完了しました。");
                  history.push(routeBuilder.adminEmployeeListPath());
                } else {
                  setError("社員情報の登録に失敗しました");
                  console.error("社員情報の登録に失敗しました");
                }
              }
            } else {
              window.alert("メールアドレスが既に登録されています。");
            }
          } else {
            window.alert("社員番号が既に登録されています。");
          }
        } else {
          setError("社員情報の取得に失敗しました");
          console.error("社員情報の取得に失敗しました");
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tr>
              <td>
                <Text>社員番号</Text>
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
                <Text>社員氏名</Text>
              </td>
              <td>
                <TextField name="lastName" onChange={formik.handleChange} />
                <TextField name="firstName" onChange={formik.handleChange} />
                <ErrorText>
                  <ErrorMessage name="lastName" />
                </ErrorText>
                <ErrorText>
                  <ErrorMessage name="firstName" />
                </ErrorText>
              </td>
            </tr>

            <tr>
              <td>
                <Text>所属部署</Text>
              </td>
              <td>
                <PullDown
                  name="groupList"
                  handleChange={formik.handleChange}
                  options={props.groups}
                />
                <ErrorText>
                  <ErrorMessage name="groupList" />
                </ErrorText>
              </td>
            </tr>

            <tr>
              <td>
                <Text>メールアドレス</Text>
              </td>
              <td>
                <TextField name="email" onChange={formik.handleChange} />
                <ErrorText>
                  <ErrorMessage name="email" />
                </ErrorText>
              </td>
            </tr>

            <tr>
              <td>
                <Text>等級</Text>
              </td>
              <td>
                <TextField name="grade" onChange={formik.handleChange} />
                <ErrorText>
                  <ErrorMessage name="grade" />
                </ErrorText>
              </td>
            </tr>

            <tr>
              <td>
                <Text>所属長</Text>
              </td>
              <td>
                <PullDown
                  name="superiorList"
                  handleChange={formik.handleChange}
                  options={props.superiors}
                />
                <ErrorText>
                  <ErrorMessage name="superiorList" />
                </ErrorText>
              </td>
            </tr>

            <tr>
              <td>
                <Text>マスター管理</Text>
              </td>
              <td>
                <PullDown
                  name="isAdmin"
                  handleChange={formik.handleChange}
                  options={props.isAdmin}
                />
                <ErrorText>
                  <ErrorMessage name="isAdmin" />
                </ErrorText>
              </td>
            </tr>

            <tr>
              <td>
                <Text>参照権限</Text>
              </td>
              <td>
                <PullDown
                  name="manager"
                  handleChange={formik.handleChange}
                  options={props.manager}
                />
                <ErrorText>
                  <ErrorMessage name="manager" />
                </ErrorText>
              </td>
            </tr>

            <CommandButton type="submit">社員登録</CommandButton>
            <SpaceStyle>
              <Button href={routeBuilder.adminEmployeeListPath()}>
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
