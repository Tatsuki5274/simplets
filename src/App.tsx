//React
import React from 'react';
import {BrowserRouter, Route, Switch, Link } from "react-router-dom";
//Amplify
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

//Type
import * as APIt from 'API';

//カスタムコンポーネント
import RevieweeSheetShow from "reviewee/sheet/index/index"
import RevieweeSheetNew from "reviewee/sheet/new/index"
import ListPerformanceEvalution from 'reviewee/list/performance';
import ProgressReferenceList from 'reviewer/list/progress';
import EvalutionScreen from "reviewer/sheet/detail";
Amplify.configure(awsconfig);

export type Sheet = Omit<Exclude<APIt.GetSheetQuery['getSheet'], null>, '__typename'>;
export type Objective = Omit<Exclude<APIt.GetObjectiveQuery['getObjective'], null>, '__typename'>;
export type Section = Omit<Exclude<APIt.GetSectionQuery['getSection'], null>, '__typename'>;

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


function Portal(){
  //一時的な実装。将来的には置き換える。
  return (
    <div>
      <Link to='/reviewee/sheet/1'>目標設定画面</Link><br />
      <Link to='/reviewee/objective/new/:sheetId'>目標追加</Link><br />
      <Link to='/reviewee/list'>業績評価一覧</Link><br />
      <Link to='/reviewer/list'>進捗参照一覧</Link><br />
      <Link to='/reviewer/sheet'>評価画面</Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Portal} />
          <Route exact path="/reviewee/objective/new/:sheetId" component={RevieweeSheetNew} />
          <Route exact path="/reviewee/sheet/:sheetId" component={RevieweeSheetShow} />
          <Route exact path="/reviewee/list" component={ListPerformanceEvalution} />
          <Route exact path="/reviewer/list" component={ProgressReferenceList} />
          <Route exact path="/reviewer/sheet/:sheetId" component={EvalutionScreen} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App);
