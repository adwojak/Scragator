import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: true
        };
    }

    render() {
        return (
            <nav>
                <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/another">Aboequt</Link>
                </li>
                <li>
                    <Link to="/addArticle">Add article</Link>
                </li>
                {this.state.isLogged ? (
                    <Fragment>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </Fragment>
                )}
                </ul>
            </nav>
        )
    }
}

export default Header;