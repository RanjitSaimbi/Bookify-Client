import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserAPI from "../api/UserApi";
import AppAPI from "../api/AppApi";
import styles from "../styles/SignUp.module.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

class SignUp extends Component {
  state = { username: "", email: "", password: "" };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = () => {
    UserAPI.signup(this.state).then(data => {
      if (data.error) {
        data.error === "This user already exists."
          ? this.setState({ displayHeader: true })
          : alert(data.error);
      } else {
        this.props.signin(this.state.username, data.token);
        AppAPI.fetchListings().then(resp =>
          this.props.filterOutMylistings(resp)
        );
        this.props.history.push("/");
      }
    });
  };

  handleLogIn = () => {
    UserAPI.signin({
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }).then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        this.props.signin(data.username, data.token);
        this.props.history.push("/");
      }
    });
  };

  render() {
    const { username, email, password, loginEmail, loginPassword } = this.state;
    const { handleChange, handleSubmit, handleLogIn } = this;
    return (
      <div>
        <div className={styles.container} />
        <MDBContainer>
          <MDBRow>
            {this.state.displayHeader ? null : (
              <MDBCol md="6">
                <form>
                  <p className="h5 text-center mb-4">Sign Up</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Your username"
                      value={username}
                      onChange={handleChange}
                      name="username"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      value={email}
                      onChange={handleChange}
                      name="email"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Type your password"
                      value={password}
                      onChange={handleChange}
                      name="password"
                      icon="lock"
                      group
                      type="password"
                      validate
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn onClick={handleSubmit}>Sign Up</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            )}
            <MDBCol md="6">
              <form>
                {this.state.displayHeader ? (
                  <p className="red-text">User already exists</p>
                ) : null}
                <p className="h5 text-center mb-4">Log in</p>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    value={loginEmail}
                    onChange={handleChange}
                    name="loginEmail"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Type your password"
                    value={loginPassword}
                    onChange={handleChange}
                    name="loginPassword"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <MDBBtn onClick={handleLogIn}>Log In</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default SignUp;
