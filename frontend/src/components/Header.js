// @flow
import * as React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { logoutUser, showBurgerMenu, hideBurgerMenu } from "../states/actions";
import type { InitialStateType } from "../states/types";
import logoutAPI from "../api/logout";
import "./Header.scss";
import homeIcon from "../static/images/houseIcon.png";

const mapStateToProps = (state: InitialStateType): Object => {
  return {
    isLogged: state.isLogged,
    burgerMenuVisible: state.burgerMenuVisible
  };
};

const mapDispatchToProps = (dispatch: Object): Object => {
  return {
    logoutUser: (): Object => dispatch(logoutUser()),
    showBurgerMenu: (): Object => dispatch(showBurgerMenu()),
    hideBurgerMenu: (): Object => dispatch(hideBurgerMenu())
  };
};

export const HeaderIcon = (): React.Node => {
  return (
    <NavLink className="NavLink" to="/">
      <img src={homeIcon} className="Icon" alt="Home Icon" />
    </NavLink>
  );
};

export const HeaderTitle = (): React.Node => {
  return <h1 className="Title">Quokka</h1>;
};

export const HeaderSearchBar = (): React.Node => {
  return (
    <form className="SearchBar" autoComplete="Off">
      <input type="search" name="search" />
    </form>
  );
};

type NavbarPropsType = $ReadOnly<{|
  ...InitialStateType,
  changeBurgerMenuVisibility: Object,
  handleLogout: Object,
  hideBurgerMenu: Object
|}>;

export const HeaderNavbar = (props: NavbarPropsType): React.Node => {
  return (
    <nav
      role="navigation"
      className={classNames({
        burgerVisible: props.burgerMenuVisible,
        burgerHidden: !props.burgerMenuVisible
      })}
    >
      <FontAwesomeIcon
        icon={faBars}
        className="burgerMenuIcon"
        onClick={(): Object => props.changeBurgerMenuVisibility()}
      />
      <ul role="menubar" onClick={props.hideBurgerMenu}>
        <li>
          <NavLink className="NavLink" to="/">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink className="NavLink" to="/services">
            SERVICES
          </NavLink>
        </li>
        <div className="ProfileLinks">
          {props.isLogged ? (
            <React.Fragment>
              <li>
                <NavLink className="NavLink" to="/profile">
                  PROFILE
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="LinkButton"
                  onClick={props.handleLogout}
                >
                  LOGOUT
                </button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink className="NavLink" to="/login">
                  LOGIN
                </NavLink>
              </li>
              <li>
                <NavLink className="NavLink" to="/register">
                  REGISTER
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </div>
      </ul>
    </nav>
  );
};

type PropsType = $ReadOnly<{|
  ...InitialStateType,
  hideBurgerMenu: Object,
  showBurgerMenu: Object,
  logoutUser: Object
|}>;

class Header extends React.Component<PropsType> {
  changeBurgerMenuVisibility = () => {
    this.props.burgerMenuVisible
      ? this.props.hideBurgerMenu()
      : this.props.showBurgerMenu();
  };

  handleLogout = (event: Event) => {
    event.preventDefault();
    logoutAPI
      .POST()
      .then(response => {
        this.props.logoutUser();
        // Need to go back to '/' location, but can't do that because of missing router in header...
      })
      .catch(error => {
        // Need to go back to '/' location, but can't do that because of missing router in header...
      });
  };

  render(): React.Node {
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
          hideBurgerMenu={this.props.hideBurgerMenu}
        />
      </div>
    );
  }
}

export default connect<PropsType, InitialStateType, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(Header);
