import React, { Component } from "react";
import fire from "../../firebase-config/fire";
import firebase from "firebase";
import ErrorLoader from "../loader/ErrorLoader";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
    };
    this.login = this.login.bind(this);
  }
  login() {
    this.setState({ loading: true });
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    fire
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        this.setState({ loading: false, error: null });
      })
      .catch((err) => {
        this.setState({ loading: false, error: err });
      });
  }
  loginWithGoogle = () => {
    this.setState({ loading: true });
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    fire
      .auth()
      .signInWithPopup(provider)
      .then((u) => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false, error: err });
      });
  };
  loginWithFacebook = () => {
    this.setState({ loading: true });
    const facebook = new firebase.auth.FacebookAuthProvider();
    facebook.setCustomParameters({ display: "popup" });
    fire
      .auth()
      .signInWithPopup(facebook)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false, error: err });
      });
  };

  render() {
    return this.state.loading ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" style={{ width: "10rem", height: "10rem" }} />
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table>
            <tbody>
              <tr>
                <td>Email</td>
                <td>
                  <input id="email" type="email" placeholder="Enter Email" width="100px" className="form-control" />
                </td>
              </tr>

              <tr>
                <td>Password</td>
                <td>
                  <input id="password" type="password" placeholder="Enter Password" className="form-control" />
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <Button variant="warning" onClick={this.login}>
                    Login
                  </Button>
                </td>
              </tr>

              <tr>
                <td>
                  <Button onClick={this.loginWithGoogle} variant="outline-light">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Login" />
                  </Button>
                </td>
                <td>
                  <Button onClick={this.loginWithFacebook} variant="outline-light">
                    <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Google Login" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {this.state.error !== null ? (
          <Container>
            <Row className="justify-content-md-center">
              <ErrorLoader />
            </Row>
            <Row>
              <Col>
                <p style={{ color: "red" }}>{this.state.error.message}</p>
              </Col>
            </Row>
          </Container>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Login;
