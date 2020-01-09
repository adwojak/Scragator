// @flow
import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { loginUser } from "../states/actions";
import Button from "../libs/components/Button";
import Input from "../libs/components/Input";
import Form from "../libs/components/Form";
import Label from "../libs/components/Label";
import EmailValidator from "../libs/validators/EmailValidator";
import PasswordValidator from "../libs/validators/PasswordValidator";
import { axiosPost } from "../api/apiBase";
import { HOME, LOGIN } from "../api/urls";
import "./Login.scss";

function mapDispatchToProps(dispatch: Object): Object {
  return {
    loginUser: (
      email: string,
      accessToken: string,
      refreshToken: string,
      favouriteArticles: Array,
      favoutireServices: Array
    ): Object =>
      dispatch(
        loginUser({
          email,
          accessToken,
          refreshToken,
          favouriteArticles,
          favoutireServices
        })
      )
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
    const { t } = this.props;

    axiosPost(LOGIN, {
      email: email.value,
      password: password.value
    })
      .then((response: Object) => {
        const data = response.data;
        if (data.form_error === "BAD_EMAIL") {
          this.setState({
            formError: t("WRONG_EMAIL")
          });
        } else if (data.form_error === "BAD_PASSWORD") {
          this.setState({
            formError: t("BAD_PASSWORD")
          });
        } else if (data.access_token || data.refresh_token) {
          this.props.loginUser(
            email.value,
            data.access_token,
            data.refresh_token,
            data.favourite_articles,
            data.favourite_services
          );
          this.props.history.push("/", {
            url: HOME
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
          <Label htmlFor="login">{t("LOGIN")}</Label>
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
        </div>
        <Button>LOGIN</Button>
        <div className="Links">
          <NavLink className="NavLink" to="/resetPassword">
            {t("FORGOR_PASSWD")}
          </NavLink>
          <NavLink className="NavLink" to="/register">
          {t("NEW_USER")}
          </NavLink>
        </div>
      </form>
    );
  }
}

export default connect<_, PropsType, _, _, _, _>(
  null,
  mapDispatchToProps
)(withTranslation()(Login));
