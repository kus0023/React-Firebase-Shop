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
        <Spinner
          as="span"
          animation="border"
          size="lg"
          role="status"
          aria-hidden="true"
          style={{ width: "10rem", height: "10rem" }}
        />
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
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    width="100px"
                    className="form-control"
                  />
                </td>
              </tr>

              <tr>
                <td>Password</td>
                <td>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                  />
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
                  <Button
                    onClick={this.loginWithGoogle}
                    variant="outline-light"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="Google Login"
                      width="30px"
                    />
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={this.loginWithFacebook}
                    variant="outline-light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      version="1"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z"
                      ></path>
                      <path
                        fill="#4267b2"
                        d="M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z"
                      ></path>
                    </svg>
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
