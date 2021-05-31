/* eslint-disable no-console */

//React
import React, { createContext, useEffect, useState } from "react";
import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignUp,
  VerifyContact,
  withAuthenticator,
} from "aws-amplify-react";

//Amplify
// import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

//Type
import * as APIt from "API";

//カスタムコンポーネント
import { EmployeeDao } from "lib/dao/employeeDao";
import Router from "router";
import { HeaderProps } from "views/components/common/organisms/Header";
import { Employee, EmployeeType } from "API";
import { createSidebarElements } from "lib/util";
import { getEmployee } from "graphql/queries";
import CustomSignIn from "views/auth/signIn";
import { LinkType } from "views/components/common/atoms/Types";
import ErrorMessageView from "views/components/common/templates/ErrorMessageView";
Amplify.configure(awsconfig);

// export type Sheet = Omit<Exclude<APIt.GetSheetQuery['getSheet'], null>, '__typename'>;
// export type Objective = Omit<Exclude<APIt.GetObjectiveQuery['getObjective'], null>, '__typename'>;
// export type Section = Omit<Exclude<APIt.GetSectionQuery['getSection'], null>, '__typename'>;
// export type Group = Omit<Exclude<APIt.GetGroupQuery['getGroup'], null>, '__typename'>;
// export type Category = Omit<Exclude<APIt.GetCategoryQuery['getCategory'], null>, '__typename'>;
// export type Employee = Omit<Exclude<APIt.GetEmployeeQuery['getEmployee'], null>, '__typename'>;
// export type Company = Omit<Exclude<APIt.GetCompanyQuery['getCompany'], null>, '__typename'>;
export type SendEmail = Omit<Exclude<APIt.sendEmailInput, null>, "__typename">;
// export type Report = Omit<Exclude<APIt.GetReportQuery['getReport'], null>, '__typename'>;

type User = {
  username: string;
  attributes: {
    "custom:companyId": string;
    sub: string;
    "custom:isCompanyAdmin": string;
  };
};
export const UserContext = createContext<User | null>(null);
export const EmployeeContext = createContext<Employee | null>(null);
export const HeaderContext = createContext<HeaderProps | null>(null);
export const SidebarContext = createContext<LinkType[][] | null>(null);
export const ErrorContext = createContext<
  React.Dispatch<React.SetStateAction<string | null>>
>(() => console.log("実装されていません"));

//approvalStatusManagerの引数の型
export type approvalStatusManagerMutationVariables = {
  // proceed = ステータスを次へ移動   remand = 差し戻し   reference = ステータスの参照
  action: "proceed" | "remand";
  sheetId: number;
};
export type approvalStatusManagerMutationResult = {
  result: "success" | "faild";
  statusCode: number; //通信のステータスコード 基本的に200
  message?: string;
  error?: string; //エラー時のメッセージを格納
};

// const getEmployee = /* GraphQL */ `
//   query GetEmployee($companyID: ID!, $username: ID!) {
//     getEmployee(companyID: $companyID, username: $username) {
//       companyID
//       username
//       firstName
//       lastName
//       superiorUsername
//       employeeGroupLocalId
//       manager
//       isCompanyAdmin
//       group {
//         name
//       }
//       company {
//         id
//         name
//         startMonth
//       }
//       superior {
//         email
//         firstName
//         lastName
//       }
//     }
//   }
// `;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [header, setHeader] = useState<HeaderProps | null>(null);
  const [sidebar, setSidebar] = useState<LinkType[][] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      const result: User = {
        attributes: {
          "custom:companyId": user.attributes["custom:companyId"],
          "custom:isCompanyAdmin": user.attributes["custom:isCompanyAdmin"],
          sub: user.attributes["sub"],
        },
        username: user.username,
      };
      setUser(result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        const employee = await EmployeeDao.get(getEmployee, {
          username: user.username,
        });
        setEmployee(employee);
      }
    })();
  }, [user]);

  useEffect(() => {
    (() => {
      if (employee) {
        const header: HeaderProps = {
          companyName: employee.company?.name,
          groupName: employee.group?.name,
          lastName: employee.lastName,
          firstName: employee.firstName,
        };
        setHeader(header);
      }
    })();
  }, [employee]);

  useEffect(() => {
    let isManager = false;
    if (
      employee &&
      (employee.manager === EmployeeType.MANAGER ||
        employee.manager === EmployeeType.SUPER_MANAGER)
    ) {
      isManager = true;
    }

    const sidebar = createSidebarElements(
      isManager,
      employee?.isCompanyAdmin || false
    );
    setSidebar(sidebar);
  }, [employee]);

  return (
    <div>
      <UserContext.Provider value={user}>
        <EmployeeContext.Provider value={employee}>
          <HeaderContext.Provider value={header}>
            <SidebarContext.Provider value={sidebar}>
              <ErrorContext.Provider value={setErrorMessage}>
                <Router />
                <ErrorMessageView>{errorMessage || undefined}</ErrorMessageView>
              </ErrorContext.Provider>
            </SidebarContext.Provider>
          </HeaderContext.Provider>
        </EmployeeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default withAuthenticator(App, false, [
  <CustomSignIn key="1" />,
  <ConfirmSignIn key="2" />,
  <VerifyContact key="3" />,
  <SignUp key="4" />,
  <ConfirmSignUp key="5" />,
  <ForgotPassword key="6" />,
  <RequireNewPassword key="7" />,
]);
