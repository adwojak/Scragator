// @flow
import * as React from "react";
import { withTranslation } from 'react-i18next';
import Button from "../libs/componentsOld/Button";
import Input from "../libs/componentsOld/Input";
import Form from "../libs/componentsOld/Form";
import Label from "../libs/componentsOld/Label";
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
    const { t } = this.props;
    axiosPost(REGISTER, {
      email: email.value,
      password: password.value,
      password_confirm: repeatPassword.value
    })
      .then((response: Object) => {
        const data = response.data;
        if (data.user_exists) {
          this.setState({
            formError: t("USER_EXISTS")
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
        this.props.history.push("/message", {
          serverError: true
        });
      });
  };

  render(): React.Node {
    const { t } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="Form" noValidate>
        <div>
          <Label htmlFor="register">{t("REGISTER")}</Label>
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
            placeholder={t("PASSWD_HOLDER")}
            type="password"
            required
            setInputData={this.setInputData}
            validator={PasswordValidator}
          />
          <Input
            id="repeatPassword"
            placeholder={t("REPEAT_PASSWD_HOLDER")}
            type="password"
            required
            setInputData={this.setInputData}
            validator={PasswordValidator}
          />
        </div>
        <Button>{t("REGISTER")}</Button>
      </form>
    );
  }
}

export default withTranslation()(Register);
