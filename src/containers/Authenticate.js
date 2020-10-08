import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "../components/login";
import SignUp from "../components/signup/SignUp";

function Authenticate() {
  return (
    <Router>
      <div>
        <h1 style={{ textAnchor: "unset" }}>
          <Link to="/login">Login</Link> | <Link to="/signup">SignUp</Link>
        </h1>
      </div>

      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </Router>
  );
}

export default Authenticate;
