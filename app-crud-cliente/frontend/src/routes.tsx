import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

// Pages
import Client from "./pages/Client";
import Administrator from "./pages/Administrator";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/cliente" component={Client} />
        <Route path="/admin" component={Administrator} />
      </Switch>
    </BrowserRouter>
  );
}
