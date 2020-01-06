// @flow
import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginUser } from "../states/actions";
import Button from "../libs/components/Button";
import Input from "../libs/components/Input";
import Form from "../libs/components/Form";
import Label from "../libs/components/Label";
import EmailValidator from "../libs/validators/EmailValidator";
import PasswordValidator from "../libs/validators/PasswordValidator";
import loginAPI from "../api/login";
import "./Login.scss";

function mapDispatchToProps(dispatch: Object): Object {
  return {
    loginUser: (
      email: string,
      accessToken: string,
      refreshToken: string
    ): Object => dispatch(loginUser({ email, accessToken, refreshToken }))
  };
}

type PropsType = $ReadOnly<{|
  loginUser: Object
|}>;

type StateType = $ReadOnly<{|
  email: string,
  password: string
|}>;

class Login extends Form<PropsType, StateType> {
  formInputs = ["email", "password"];
  state = this.createLocalState(this.formInputs);

  executeValidFormSubmit = () => {
    const { email, password } = this.state;
    loginAPI
      .POST({
        email: email.value,
        password: password.value
      })
      .then(response => {
        const data = response.data;
        if (data.form_error === "BAD_EMAIL") {
          this.setState({
            formError: "Wrong email"
          });
        } else if (data.form_error === "BAD_PASSWORD") {
          this.setState({
            formError: "Bad password"
          });
        } else if (data.access_token || data.refresh_token) {
          this.props.loginUser(
            email.value,
            data.access_token,
            data.refresh_token
          );
          this.props.history.push("/");
        } else {
          this.props.history.push("/message", {
            serverError: true
          });
        }
      })
      .catch(error => {
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  render(): React.Node {
    return (
      <form onSubmit={this.handleSubmit} className="Form" noValidate>
        <div>
          <Label htmlFor="login">LOGIN</Label>
          {this.state.formError && (
            <p className="FormError">{this.state.formError}</p>
          )}
          <Input
            id="email"
            placeholder="Email..."
            required
            setInputData={this.setInputData}
            validator={EmailValidator}
          />
          <Input
            id="password"
            placeholder="Password..."
            type="password"
            required
            setInputData={this.setInputData}
            validator={PasswordValidator}
          />
        </div>
        <Button>LOGIN</Button>
        <div className="Links">
          <NavLink className="NavLink" to="/resetPassword">
            Forgot password?
          </NavLink>
          <NavLink className="NavLink" to="/register">
            New user? SIGN UP
          </NavLink>
        </div>
      </form>
    );
  }
}

export default connect<_, PropsType, _, _, _, _>(
  null,
  mapDispatchToProps
)(Login);
