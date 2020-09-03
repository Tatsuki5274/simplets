import React from 'react';
import {BrowserRouter, Route, Switch, Link } from "react-router-dom";
import RevieweeSheetShow from "reviewee/sheet/index/index"
import RevieweeSheetNew from "reviewee/sheet/new/index"
import ListPerformanceEvalution from 'reviewee/list/performance';
import ProgressReferenceList from 'reviewer/list/progress';



function Portal(){
  //一時的な実装。将来的には置き換える。
  return (
    <div>
      <Link to='/reviewee/sheet/1'>目標設定画面</Link><br />
      <Link to='/reviewee/sheet/new'>目標追加</Link><br />
      <Link to='/reviewee/list'>業績評価一覧</Link><br />
      <Link to='/reviewer/list'>進捗参照一覧</Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Portal} />
          <Route exact path="/reviewee/sheet/new" component={RevieweeSheetNew} />
          <Route exact path="/reviewee/sheet/:sheetId" component={RevieweeSheetShow} />
          <Route exact path="/reviewee/list" component={ListPerformanceEvalution} />
          <Route exact path="/reviewer/list" component={ProgressReferenceList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;