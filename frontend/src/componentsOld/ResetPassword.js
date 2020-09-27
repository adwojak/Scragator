// @flow
import * as React from "react";
import { withTranslation } from 'react-i18next';
import Button from "../libs/componentsOld/Button";
import Input from "../libs/componentsOld/Input";
import Form from "../libs/componentsOld/Form";
import Label from "../libs/componentsOld/Label";
import EmailValidator from "../libs/validators/EmailValidator";

type StateType = $ReadOnly<{|
  email: string
|}>;

class ResetPassword extends Form<null, StateType> {
  formInputs = ["email"];
  state = this.createLocalState(this.formInputs);

  executeValidFormSubmit = () => {
    const { email } = this.state;
    this.props.resetPassword(email.value);
  };

  render(): React.Node {
    const { t } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="Form" noValidate>
        <div>
          <Label htmlFor="resetPassword">{t("RESET_PASSWD")}</Label>
          <Input
            id="email"
            placeholder="Email..."
            required
            setInputData={this.setInputData}
            validator={EmailValidator}
          />
        </div>
        <Button>{t("RESET_PASSWD")}</Button>
      </form>
    );
  }
}

export default withTranslation()(ResetPassword);
