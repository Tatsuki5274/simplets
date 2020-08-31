import React from 'react';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import RevieweeSheetShow from "./reviewee/sheet/index"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/reviewee/sheet/:sheetId" component={RevieweeSheetShow} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
