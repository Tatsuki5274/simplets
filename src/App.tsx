//React
import React, { createContext, useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch } from "react-router-dom";
//Amplify
import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

//Type
import * as APIt from 'API';

//カスタムコンポーネント
import RevieweeSheetShow from "reviewee/sheet/index/index"
import RevieweeSheetNew from "reviewee/sheet/new/index"
import ListPerformanceEvalution from 'reviewee/list/performance';
import ProgressReferenceList from 'reviewer/list/progress';
import EvaluationScreen from "reviewer/sheet";
Amplify.configure(awsconfig);

export type Sheet = Omit<Exclude<APIt.GetSheetQuery['getSheet'], null>, '__typename'>;
export type Objective = Omit<Exclude<APIt.GetObjectiveQuery['getObjective'], null>, '__typename'>;
export type Section = Omit<Exclude<APIt.GetSectionQuery['getSection'], null>, '__typename'>;
export type Group = Omit<Exclude<APIt.GetGroupQuery['getGroup'], null>, '__typename'>;
export type Category = Omit<Exclude<APIt.GetCategoryQuery['getCategory'], null>, '__typename'>;
export type Employee = Omit<Exclude<APIt.GetEmployeeQuery['getEmployee'], null>, '__typename'>;
export type Company = Omit<Exclude<APIt.GetCompanyQuery['getCompany'], null>, '__typename'>;
export type SendEmail = Omit<Exclude<APIt.sendEmailInput, null>, '__typename'>;

export const UserContext = createContext<any>(null)
 
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

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    ;(async()=>{
      const user = await Auth.currentAuthenticatedUser()
      setUser(user);
      console.log("user", user)
    })()
  },[]);

  return (
    <div>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ListPerformanceEvalution} />
            <Route exact path="/reviewee/objective/new/:sheetId" component={RevieweeSheetNew} />
            <Route exact path="/reviewee/sheet/:sheetId" component={RevieweeSheetShow} />
            <Route exact path="/reviewee/list" component={ListPerformanceEvalution} />
            <Route exact path="/reviewer/list" component={ProgressReferenceList} />
            <Route exact path="/reviewer/sheet/:sheetId" component={EvaluationScreen} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default withAuthenticator(App);
