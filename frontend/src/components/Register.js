// @flow
import * as React from "react";
import Button from "../libs/components/Button";
import Input from "../libs/components/Input";
import Form from "../libs/components/Form";
import Label from "../libs/components/Label";
import EmailValidator from "../libs/validators/EmailValidator";
import PasswordValidator from "../libs/validators/PasswordValidator";
import { axiosPost } from "../api/apiBase";
import { REGISTER } from "../api/urls";
import "./Register.scss";

type StateType = $ReadOnly<{|
  email: string,
  password: string,
  repeatPassword: string
|}>;

class Register extends Form<null, StateType> {
  formInputs = ["email", "password", "repeatPassword"];
  state = this.createLocalState(this.formInputs);

  executeValidFormSubmit = () => {
    const { email, password, repeatPassword } = this.state;
    axiosPost(REGISTER, {
      email: email.value,
      password: password.value,
      password_confirm: repeatPassword.value
    })
      .then((response: Object) => {
        const data = response.data;
        if (data.user_exists) {
          this.setState({
            formError: "User already exists!"
          });
        } else if (data.created) {
          this.props.history.push("/message", {
            isCreated: true
          });
        } else {
          this.props.history.push("/message", {
            serverError: true
          });
        }
      })
      .catch((error: Error) => {
        this.setState({
          serverError: true
        });
      });
  };

  render(): React.Node {
    return (
      <form onSubmit={this.handleSubmit} className="Form" noValidate>
        <div>
          <Label htmlFor="register">REGISTER</Label>
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
          <Input
            id="repeatPassword"
            placeholder="Repeat password..."
            type="password"
            required
            setInputData={this.setInputData}
            validator={PasswordValidator}
          />
        </div>
        <Button>REGISTER</Button>
      </form>
    );
  }
}

export default Register;
