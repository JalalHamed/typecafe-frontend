import React from "react";

//Libraries
import { Switch, Route } from "react-router-dom";

// Containers
import Dashboard from "container/Dashboard";

const Routers = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default Routers;
