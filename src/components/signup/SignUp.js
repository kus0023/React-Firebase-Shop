import React, { Component } from "react";
import fire from "../../firebase-config/fire";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ErrorLoader from "../loader/ErrorLoader";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
    };

    this.signin = this.signin.bind(this);
  }
  signin() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const repass = document.getElementById("repassword").value;
    this.setState({ loading: true });

    if (pass === repass) {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((u) => {
          this.setState({ loading: false });
          console.log("Account created Successfully.");
          let user = fire.auth().currentUser;
          //updating name and mobile number of user here

          return user.updateProfile({
            displayName: name,
          });
        })
        .then(() => {
          console.log("Name updated.");
        })
        .catch((err) => {
          this.setState({ loading: false, error: err });
          console.log(err);
        });
    } else {
      const err = { message: "Passwords are different." };
      this.setState({ loading: false, error: err });
    }
  }

  render() {
    return this.state.loading ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Loader />
      </div>
    ) : (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input id="name" type="text" placeholder="Enter Name" className="form-control" />
                </td>
                {/* <td rowSpan="4">
                <input type="file" />
              </td> */}
              </tr>

              <tr>
                <td>Email</td>
                <td>
                  <input id="email" type="email" placeholder="Enter Email" className="form-control" />
                </td>
              </tr>

              <tr>
                <td>Password</td>
                <td>
                  <input id="password" type="password" placeholder="Enter Password" className="form-control" />
                </td>
              </tr>

              <tr>
                <td>Re-enter Password</td>
                <td>
                  <input id="repassword" type="password" placeholder="Re-enter Password" className="form-control" />
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <Button onClick={this.signin} variant="outline-success">
                    SignUp
                  </Button>
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <Link to="/login">Login with Google</Link>
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

export default SignUp;
