// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../states/actions';

function mapDispatchToProps(dispatch: Object) {
    return {
        loginUser: (login, password) => dispatch(loginUser({login, password}))
    };
}

type Props = $ReadOnly<{|
    loginUser: Object
|}>;

type State = $ReadOnly<{|
    login: string,
    password: string
|}>;

class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        };
    }

    clearState = () => {
        this.setState({
            login: '',
            password: ''
        });
    }

    handleChange = (event: {target: {id: string, value: string}}) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const { login, password } = this.state;
        this.props.loginUser(login, password);
        this.clearState();
    }

    render() {
        const { login, password } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default connect<_, Props, _, _, _, _>(
    null,
    mapDispatchToProps
)(Login);