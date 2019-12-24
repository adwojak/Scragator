import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../states/actions';
import './Header.scss';
import homeIcon from '../static/images/houseIcon.jpg';

const mapStateToProps = state => {
    return {
        isLogged: state.isLogged
    };
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

const HeaderIcon = img => {
    return (
        <img src={homeIcon} className="Icon"/>
    );
}

const HeaderTitle = () => {
    return (
        <h1 className="Title">Quokka</h1>
    );
}

const HeaderSearchBar = () => {
    return (
        <span>Search bar</span>
    );
}

const HeaderNavbar = () => {
    return (
        <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox" />

                <span></span>
                <span></span>
                <span></span>

                <ul>
                    <li>elo</li>
                    <li>elo2</li>
                </ul>
            </div>
        </nav>
    );
}

class Header extends Component {
    handleLogout = event => {
        event.preventDefault();
        this.props.logoutUser();
    }

    render() {
        return (
            <div class="Header">
                <HeaderIcon />
                <HeaderTitle />
                <HeaderSearchBar />
                <HeaderNavbar />
            </div>
            // <nav>
            //     <ul>
            //     <li>
            //         <Link to="/">Home</Link>
            //     </li>
            //     <li>
            //         <Link to="/another">Aboequt</Link>
            //     </li>
            //     <li>
            //         <Link to="/addArticle">Add article</Link>
            //     </li>
            //     <li>
            //         <Link to="/removeArticle">Remove article</Link>
            //     </li>
            //     {this.props.isLogged ? (
            //         <Fragment>
            //             <li>
            //                 <Link to="/profile">Profile</Link>
            //             </li>
            //             <li>
            //                 <button onClick={this.handleLogout}>Logout</button>
            //             </li>
            //         </Fragment>
            //     ) : (
            //         <Fragment>
            //             <li>
            //                 <Link to="/login">Login</Link>
            //             </li>
            //             <li>
            //                 <Link to="/register">Register</Link>
            //             </li>
            //         </Fragment>
            //     )}
            //     </ul>
            // </nav>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
