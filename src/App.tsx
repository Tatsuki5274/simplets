import React from 'react';
import {BrowserRouter, Route, Switch, Link } from "react-router-dom";
import RevieweeSheetShow from "reviewee/sheet/index"

function Portal(){
  //一時的な実装。将来的には置き換える。
  return (
    <Link to='/reviewee/sheet/1'>目標設定画面</Link>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Portal} />
          <Route exact path="/reviewee/sheet/:sheetId" component={RevieweeSheetShow} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
