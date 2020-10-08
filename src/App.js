import React, { Component } from "react";
import "./App.css";
import fire from "./firebase-config/fire";
import Authenticate from "./containers/Authenticate";
import HomeContainer from "./containers/HomeContainer";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Spinner } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoading: true,
    };

    this.authListener = this.authListener.bind(this);
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user, isLoading: false });
      } else {
        this.setState({ user: null, isLoading: false });
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div className="App mt-5">
          <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" style={{ width: "15rem", height: "15rem" }} />
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    return (
      <div className="App">
        <Router>
          {this.state.user ? <Redirect to="/" /> : <Redirect to="/login" />}

          <Switch>
            <Route path="/" exact component={HomeContainer} />
            <Route path="/login" component={Authenticate} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
