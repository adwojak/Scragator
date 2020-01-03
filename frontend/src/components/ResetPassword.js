// @flow
import * as React from "react";
import Button from "../libs/components/Button";
import Input from "../libs/components/Input";
import Form from "../libs/components/Form";
import Label from "../libs/components/Label";
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
      <form onSubmit={this.handleSubmit} className="FormLogin" noValidate>
        <div>
          <Label htmlFor="resetPassword">RESET PASSWORD</Label>
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
