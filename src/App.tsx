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
import EvaluationScreen from "reviewer/sheet";
import { PDFPage } from 'views/pdf/page';
import MySignIn from 'views/auth/signIn';
import { EmployeeDao } from 'lib/dao/employeeDao';
import EvaluationList from 'views/components/pages/evaluation/reviewer/EvaluationList';　//総合評価参照画面 テスト用
import { routeBuilder } from 'router';
import RevieweeReportList from 'views/components/pages/report/reviewee/RevieweeReportList';
import CreateReportScreen from 'views/components/pages/report/reviewee/CreateReportScreen';
import EditReportScreeen from 'views/components/pages/report/reviewer/EditReportScreeen';
import ReportListScreen from 'views/components/pages/report/reviewer/ReportListScreen';
import { HeaderProps } from 'views/components/organisms/common/Header';
import ChangeReportScreen from 'views/components/pages/report/reviewee/ChangeReportScreen';
import ErrorMessageView from 'views/components/templates/ErrorMessageView';
import { Employee, EmployeeType } from 'API';
import ReviewerReportList from 'views/components/pages/report/reviewer/ReviewerReportListCalendar';
import { LinkType } from 'views/components/atoms/Types';
import { createSidebarElements } from 'lib/util';
import ProgressReferenceScreen from 'views/components/pages/progress/reviewee/ProgressReferenceScreen';
Amplify.configure(awsconfig);

// export type Sheet = Omit<Exclude<APIt.GetSheetQuery['getSheet'], null>, '__typename'>;
// export type Objective = Omit<Exclude<APIt.GetObjectiveQuery['getObjective'], null>, '__typename'>;
// export type Section = Omit<Exclude<APIt.GetSectionQuery['getSection'], null>, '__typename'>;
// export type Group = Omit<Exclude<APIt.GetGroupQuery['getGroup'], null>, '__typename'>;
// export type Category = Omit<Exclude<APIt.GetCategoryQuery['getCategory'], null>, '__typename'>;
// export type Employee = Omit<Exclude<APIt.GetEmployeeQuery['getEmployee'], null>, '__typename'>;
// export type Company = Omit<Exclude<APIt.GetCompanyQuery['getCompany'], null>, '__typename'>;
export type SendEmail = Omit<Exclude<APIt.sendEmailInput, null>, '__typename'>;
// export type Report = Omit<Exclude<APIt.GetReportQuery['getReport'], null>, '__typename'>;

type User = {
  username: string
  attributes: {
    "custom:companyId": string,
    sub: string
  }
}
export const UserContext = createContext<User | null>(null)
export const EmployeeContext = createContext<Employee | null>(null)
export const HeaderContext = createContext<HeaderProps | null>(null)
export const SidebarContext = createContext<LinkType[][] | null>(null)
export const ErrorContext = createContext<React.Dispatch<React.SetStateAction<string | null>>>(() => console.log("実装されていません"));


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
      superiorUsername
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
      superior {
        email
        firstName
        lastName
      }
    }
  }
`;

function App() {
  const [user, setUser] = useState<any>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [header, setHeader] = useState<HeaderProps | null>(null);
  const [sidebar, setSidebar] = useState<LinkType[][] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

  useEffect(() => {
    ; (() => {
      if (employee) {
        const header: HeaderProps = {
          companyName: employee.company?.name,
          groupName: employee.group?.name,
          lastName: employee.lastName,
          firstName: employee.firstName
        }
        setHeader(header)
      }
    })()
  }, [employee]);

  useEffect(() => {
    let isManager = false
    if(employee &&
      (employee.manager === EmployeeType.MANAGER ||
      employee.manager === EmployeeType.SUPER_MANAGER)) {
        isManager = true
      }

    const sidebar = createSidebarElements(isManager, false)
    setSidebar(sidebar)
  }, [employee])


  return (
    <div>
      <UserContext.Provider value={user}>
        <EmployeeContext.Provider value={employee}>
          <HeaderContext.Provider value={header}>
            <SidebarContext.Provider value={sidebar}>
              <ErrorContext.Provider value={setErrorMessage}>
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/" component={ListPerformanceEvalution} />
                    <Route exact path={routeBuilder.revieweeDetailPath(":sub", ":year")} component={RevieweeSheetShow} />
                    <Route exact path={routeBuilder.revieweeListPath()} component={ListPerformanceEvalution} />
                    <Route exact path={routeBuilder.reviewerListPath()} component={ProgressReferenceScreen} />
                    <Route exact path={routeBuilder.reviewerDetailPath(":sub", ":year")} component={EvaluationScreen} />
                    <Route exact path={routeBuilder.previewPath(":sub", ":year")} component={PDFPage} />
                    <Route exact path={routeBuilder.reviewerEvaluationListPath()} component={EvaluationList} />

                    <Route exact path={routeBuilder.revieweeReportCalendarPath(":date")} component={RevieweeReportList} />
                    <Route exact path={routeBuilder.revieweeReportNewPath(":date")} component={CreateReportScreen} />
                    <Route exact path={routeBuilder.revieweeReportEditPath(":date")} component={ChangeReportScreen} />
                    <Route exact path={routeBuilder.reviewerReportCommentPath(":date", ":sub")} component={EditReportScreeen} />
                    <Route exact path={routeBuilder.reviewerReportEmployeePath()} component={ReportListScreen} />
                    <Route exact path={routeBuilder.reviewerReportCalendarPaht(":date")} component={ReviewerReportList} />
                  </Switch>
                  <ErrorMessageView>{errorMessage || undefined}</ErrorMessageView>
                </BrowserRouter>
              </ErrorContext.Provider>
            </SidebarContext.Provider>
          </HeaderContext.Provider>
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