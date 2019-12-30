import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { logoutUser, showBurgerMenu, hideBurgerMenu } from '../states/actions';
import './Header.scss';
import homeIcon from '../static/images/houseIcon.png';

const mapStateToProps = state => {
    return {
        isLogged: state.isLogged,
        burgerMenuVisible: state.burgerMenuVisible
    };
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        showBurgerMenu: () => dispatch(showBurgerMenu()),
        hideBurgerMenu: () => dispatch(hideBurgerMenu())
    }
}

const HeaderIcon = () => {
    return (
        <NavLink className="NavLink" to="/"><img src={homeIcon} className="Icon" alt="Home Icon"/></NavLink>
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
    return (
        <nav role="navigation" className={classNames({
            'burgerVisible': props.burgerMenuVisible,
            'burgerHidden': !props.burgerMenuVisible
        })}>
            <FontAwesomeIcon icon={faBars} className="burgerMenuIcon" onClick={() => props.changeBurgerMenuVisibility()} />
            <ul role="menubar" onClick={props.hideBurgerMenu}>
                <li><NavLink className="NavLink" to="/">HOME</NavLink></li>
                <li><NavLink className="NavLink" to="/another">SERVICES</NavLink></li>
                <li><NavLink className="NavLink" to="/addArticle">ABOUT</NavLink></li>
                <div className="ProfileLinks">
                {props.isLogged ? (
                    <Fragment>
                        <li>
                            <NavLink className="NavLink" to="/profile">PROFILE</NavLink>
                        </li>
                        <li>
                            <button type="button" className="LinkButton" onClick={props.handleLogout}>LOGOUT</button>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li>
                            <NavLink className="NavLink" to="/login">LOGIN</NavLink>
                        </li>
                        <li>
                            <NavLink className="NavLink" to="/register">REGISTER</NavLink>
                        </li>
                    </Fragment>
                )}
                </div>
            </ul>
        </nav>
    );
}

class Header extends Component {
    changeBurgerMenuVisibility = () => {
        this.props.burgerMenuVisible? this.props.hideBurgerMenu() : this.props.showBurgerMenu();
    }

    handleLogout = event => {
        event.preventDefault();
        this.props.logoutUser();
    }

    render() {
        return (
            <div className="Header">
                <HeaderIcon />
                <HeaderTitle />
                <HeaderSearchBar />
                <HeaderNavbar
                    burgerMenuVisible={this.props.burgerMenuVisible}
                    changeBurgerMenuVisibility={this.changeBurgerMenuVisibility}
                    isLogged={this.props.isLogged}
                    handleLogout={this.handleLogout}
                    hideBurgerMenu={this.props.hideBurgerMenu} />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
