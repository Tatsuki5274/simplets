/* eslint-disable prettier/prettier */ // Todo delete lint ignore 
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
  import Button from "views/components/common/atoms/Button";
  import ErrorText from "views/components/common/atoms/ErrorText";
  import Text from "views/components/common/atoms/Text";
  import TextField from "views/components/common/atoms/TextField";
  import { SelectLabel } from "views/components/common/atoms/Types";
  import CommandButton from "views/components/common/molecules/CommandButton";
  import PullDown from "views/components/common/molecules/PullDown";
  import * as Yup from "yup";
  
  const SpaceStyle = styled.p({
    textIndent: "-1em",
    marginLeft: "1em",
  });
  
  export default function () {
    return (
      <Text>
        <p>
            <p>
                社員マスタに社員情報を新規登録することができます。
                <br />
                新規社員情報を登録するとSimplet&#39;sのユーザアカウントが作成されます。
            </p>
            <SpaceStyle>
                ※[社員番号]項目と[メールアドレス]項目は
                <br />
                社員マスタに登録されていない値を入力する必要があります。
                <br />
                （社員マスタに登録されている値を入力するとエラーが表示されます。）
            </SpaceStyle>
        </p>
      </Text>
    );
  }
  