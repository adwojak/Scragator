import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faBars, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { logoutUser } from '../states/actions';
import './Header.scss';
import homeIcon from '../static/images/houseIcon.png';

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
        <form className="SearchBar" autoComplete="Off">
            <input type="search" name="search" />
        </form>
    );
}

const HeaderNavbar = props => {
    let icon = faBars;

    return (
        <nav role="navigation" className={classNames({
            'burgerVisible': props.burgerMenuVisible,
            'burgerHidden': !props.burgerMenuVisible
        })}>
            <FontAwesomeIcon icon={icon} className="burgerMenuIcon" onClick={() => props.changeBurgerMenuVisibility()} />
            <ul role="mainNav">
                <li><strong>HOME</strong></li>
                <li><strong>SERVICES</strong></li>
                <li><strong>ABOUT</strong></li>
                <div class="ProfileLinks">
                    <li><strong>PROFILE</strong></li>
                    <li><strong>LOGOUT</strong></li>
                </div>
            </ul>
        </nav>
    );
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            burgerMenuVisible: null
        }
    }

    changeBurgerMenuVisibility = () => {
        this.setState({
            burgerMenuVisible: this.state.burgerMenuVisible ? false : true
        })
    }

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
                <HeaderNavbar burgerMenuVisible={this.state.burgerMenuVisible} changeBurgerMenuVisibility={this.changeBurgerMenuVisibility} />
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
