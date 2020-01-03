// @flow
import * as React from "react";
import Button from "../libs/components/Button";
import Input from "../libs/components/Input";
import Form from "../libs/components/Form";
import EmailValidator from "../libs/validators/EmailValidator";

type StateType = $ReadOnly<{|
  email: string
|}>;

class ResetPassword extends Form<null, StateType> {
  formInputs = ["email"];
  state = this.createLocalState(this.formInputs);

  executeValidFormSubmit = () => {
    const { email } = this.state;
    // Handle axios request for rest password
    this.props.resetPassword(email.value);
  };

  render(): React.Node {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div>
          <label htmlFor="resetPassword">Reset password</label>
          <Input
            id="email"
            placeholder="Email..."
            required
            setInputData={this.setInputData}
            validator={EmailValidator}
          />
        </div>
        <Button buttonText="RESET PASSWORD" />
      </form>
    );
  }
}

export default ResetPassword;
