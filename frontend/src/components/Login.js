// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../states/actions';

function mapDispatchToProps(dispatch: Object): Object {
    return {
        loginUser: (login: string, password: string): Object => dispatch(loginUser({ login, password }))
    };
}

type PropsType = $ReadOnly<{|
    loginUser: Object
|}>;

type StateType = $ReadOnly<{|
    login: string,
    password: string
|}>;

class Login extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
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
        this.setState({ [ event.target.id ]: event.target.value })
    }

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const { login, password } = this.state;
        this.props.loginUser(login, password);
        this.clearState();
    }

    render(): React.Node {
        const { login, password } = this.state;
        return (
            <form onSubmit={ this.handleSubmit }>
                <div>
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        value={ login }
                        onChange={ this.handleChange }
                    />
                    <input
                        type="password"
                        id="password"
                        value={ password }
                        onChange={ this.handleChange }
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default connect<_, PropsType, _, _, _, _>(
    null,
    mapDispatchToProps
)(Login);