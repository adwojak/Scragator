// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../states/actions';
import Button from '../libs/components/Button';
import Input from '../libs/components/Input';
import Form from '../libs/components/Form';
import EmailValidator from '../libs/validators/EmailValidator';
import PasswordValidator from '../libs/validators/PasswordValidator';

function mapDispatchToProps(dispatch: Object): Object {
    return {
        registerUser: (email: string, password: string, repeatPassword: string): Object => dispatch(registerUser({ email, password, repeatPassword }))
    };
};

type PropsType = $ReadOnly<{|
    registerUser: Object
|}>;

type StateType = $ReadOnly<{|
    email: string,
    password: string,
    repeatPassword: string
|}>;

class Register extends Form<PropsType, StateType> {

    formInputs = [ 'email', 'password', 'repeatPassword' ]
    state = this.createLocalState(this.formInputs);

    executeValidFormSubmit = () => {
        const { email, password, repeatPassword } = this.state;
        // Handle login here (axios to endpoint) and if login error - return msg and display
        // Then call loginUser?
        this.props.registerUser(email.value, password.value, repeatPassword.value);
    }

    render(): React.Node {
        return (
            <form onSubmit={ this.handleSubmit } noValidate>
                {this.state.formError && (
                    <p>{this.state.formError}</p>
                )}
                <div>
                    <label htmlFor="register">Register</label>
                    <Input id="email" placeholder="Email..." required setInputData={ this.setInputData } validator={ EmailValidator } />
                    <Input id="password" placeholder="Password..." type="password" required setInputData={ this.setInputData } validator={ PasswordValidator } />
                    <Input id="repeatPassword" placeholder="Repeat password..." type="password" required setInputData={ this.setInputData } validator={ PasswordValidator } />
                </div>
                <Button buttonText="Register" />
            </form>
        );
    }
}

export default connect<_, PropsType, _, _, _, _>(
    null,
    mapDispatchToProps
)(Register);