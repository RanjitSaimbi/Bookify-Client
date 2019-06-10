import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserAPI from "../api/UserApi";

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
      }
    });
  };

  render() {
    const { username, email, password, loginEmail, loginPassword } = this.state;
    const { handleChange, handleSubmit, handleLogIn } = this;
    return (
      <div>
        {this.state.displayHeader ? (
          <h4>
            User already exists. Please log in.
            <br />
          </h4>
        ) : null}
        {this.state.displayHeader ? null : (
          <div>
            <h5>Sign Up</h5>
            <TextField
              label="Username"
              value={username}
              onChange={handleChange}
              margin="normal"
              name="username"
            />
            <br />
            <TextField
              label="Email"
              value={email}
              onChange={handleChange}
              margin="normal"
              name="email"
              type="email"
            />
            <br />
            <TextField
              label="Password"
              value={password}
              onChange={handleChange}
              margin="normal"
              name="password"
              type="password"
            />
            <br />
            <Button onClick={handleSubmit} variant="contained" color="primary">
              SUBMIT
            </Button>
          </div>
        )}
        <div>
          <br />
          <h5>Log In</h5>

          <br />
          <TextField
            label="Email"
            value={loginEmail}
            onChange={handleChange}
            margin="normal"
            name="loginEmail"
            type="email"
          />
          <br />
          <TextField
            label="Password"
            value={loginPassword}
            onChange={handleChange}
            margin="normal"
            name="loginPassword"
            type="password"
          />
          <br />
          <Button onClick={handleLogIn} variant="contained" color="primary">
            SUBMIT
          </Button>
        </div>
      </div>
    );
  }
}

export default SignUp;
