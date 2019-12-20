import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../states/actions';

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (login, password) => dispatch(loginUser({login, password}))
    };
}

class Login extends Component {
    constructor(props) {
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

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit = event => {
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

export default connect(
    null,
    mapDispatchToProps
)(Login);