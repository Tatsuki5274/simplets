import React from 'react';
import {BrowserRouter, Route, Link, Switch } from "react-router-dom";
import RevieweeSheetShow from "./reviewee/sheet/index"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/reviewee/sheet/:sheetId" component={RevieweeSheetShow} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
