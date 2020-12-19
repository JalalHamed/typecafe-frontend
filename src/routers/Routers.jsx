import React from "react";

//Libraries
import { Switch, Route } from "react-router-dom";

// Containers
import HomePage from "containers/homepage/HomePage";

const Routers = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
    </Switch>
  );
};

export default Routers;
