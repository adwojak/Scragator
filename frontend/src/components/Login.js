// @flow
import * as React from "react";
import { connect } from "react-redux";
import { loginUser } from "../states/actions";
import Button from "../libs/components/Button";
import Input from "../libs/components/Input";
import Form from "../libs/components/Form";
import EmailValidator from "../libs/validators/EmailValidator";
import PasswordValidator from "../libs/validators/PasswordValidator";

function mapDispatchToProps(dispatch: Object): Object {
  return {
    loginUser: (email: string, password: string): Object =>
      dispatch(loginUser({ email, password }))
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
    // Handle login here (axios to endpoint) and if login error - return msg and display
    // Then call loginUser?
    this.props.loginUser(email.value, password.value);
  };

  render(): React.Node {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div>
          <label htmlFor="login">Login</label>
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
        <Button buttonText="Login" />
      </form>
    );
  }
}

export default connect<_, PropsType, _, _, _, _>(
  null,
  mapDispatchToProps
)(Login);
