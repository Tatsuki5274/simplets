//React
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react';

//Amplify
// import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

//Type
import * as APIt from 'API';

//カスタムコンポーネント
import RevieweeSheetShow from "reviewee/sheet/index/index"
import ListPerformanceEvalution from 'reviewee/list/performance';
import ProgressReferenceList from 'reviewer/list/progress';
import EvaluationScreen from "reviewer/sheet";
import { PDFPage } from 'views/pdf/page';
import MySignIn from 'views/auth/signIn';
import { EmployeeDao } from 'lib/dao/employeeDao';
import EvaluationList from 'views/components/pages/evaluation/reviewer/EvaluationList';　//総合評価参照画面 テスト用
import { routeBuilder } from 'router';
Amplify.configure(awsconfig);

export type Sheet = Omit<Exclude<APIt.GetSheetQuery['getSheet'], null>, '__typename'>;
export type Objective = Omit<Exclude<APIt.GetObjectiveQuery['getObjective'], null>, '__typename'>;
export type Section = Omit<Exclude<APIt.GetSectionQuery['getSection'], null>, '__typename'>;
export type Group = Omit<Exclude<APIt.GetGroupQuery['getGroup'], null>, '__typename'>;
export type Category = Omit<Exclude<APIt.GetCategoryQuery['getCategory'], null>, '__typename'>;
export type Employee = Omit<Exclude<APIt.GetEmployeeQuery['getEmployee'], null>, '__typename'>;
export type Company = Omit<Exclude<APIt.GetCompanyQuery['getCompany'], null>, '__typename'>;
export type SendEmail = Omit<Exclude<APIt.sendEmailInput, null>, '__typename'>;

type User = {
  username: string
  attributes: {
    "custom:companyId": string
  }
}
export const UserContext = createContext<User | null>(null)
export const EmployeeContext = createContext<Employee | null>(null)

//approvalStatusManagerの引数の型
export type approvalStatusManagerMutationVariables = {
  // proceed = ステータスを次へ移動   remand = 差し戻し   reference = ステータスの参照
  action: "proceed" | "remand",
  sheetId: number
};
export type approvalStatusManagerMutationResult = {
  result: "success" | "faild"
  statusCode: number  //通信のステータスコード 基本的に200
  message?: String
  error?: String  //エラー時のメッセージを格納
}

const getEmployee = /* GraphQL */ `
  query GetEmployee($companyID: ID!, $username: ID!) {
    getEmployee(companyID: $companyID, username: $username) {
      companyID
      username
      firstName
      lastName
      employeeGroupLocalId
      manager
      group {
        name
      }
      company {
        id
        name
        startMonth
      }
    }
  }
`;

function App() {
  const [user, setUser] = useState<any>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    ; (async () => {
      const user = await Auth.currentAuthenticatedUser()
      setUser(user);
      console.log("user", user)    
    })()
  }, []);

  useEffect(() => {
    ; (async () => {
      if (user) {
        const employee = await EmployeeDao.get(getEmployee, { companyID: user.attributes["custom:companyId"], username: user.username })      
        setEmployee(employee);
        console.log("employee", employee)
      }
    })()
  }, [user]);


  return (
    <div>
      <UserContext.Provider value={user}>
        <EmployeeContext.Provider value={employee}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={ListPerformanceEvalution} />
              <Route exact path="/reviewee/company/:companyId/reviewee/:reviewee/year/:year" component={RevieweeSheetShow} />
              <Route exact path="/reviewee/list" component={ListPerformanceEvalution} />
              <Route exact path="/reviewer/list" component={ProgressReferenceList} />
              <Route exact path="/reviewer/company/:companyId/reviewee/:reviewee/year/:year" component={EvaluationScreen} />
              <Route exact path="/preview/company/:companyId/reviewee/:reviewee/year/:year" component={PDFPage} />
              {/* 総合評価参照画面 テスト用 */}
              <Route exact path={routeBuilder.reviewerEvaluationListPath()} component={EvaluationList} />
            </Switch>
          </BrowserRouter>
        </EmployeeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default withAuthenticator(App, false, [
  <MySignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <SignUp />,
  <ConfirmSignUp />,
  <ForgotPassword />,
  <RequireNewPassword />
]);