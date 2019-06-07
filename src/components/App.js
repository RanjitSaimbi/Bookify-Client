import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "./Container";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={props => <Container />} />
        <Route
          exact
          path="/listing/:id"
          component={props => <h1>INDIVIDUAL LISTING</h1>}
        />
        <Route
          exact
          path="/listing/create"
          component={props => <h1>CREATE LISTING</h1>}
        />
        <Route
          exact
          path="/mylistings"
          component={props => <h1>MY LISTINGS</h1>}
        />
        <Route component={props => <h1>404 - Not Found</h1>} />
      </Switch>
    </div>
  );
}

export default App;
