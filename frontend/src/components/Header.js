// @flow
import * as React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { logoutUser, showBurgerMenu, hideBurgerMenu } from "../states/actions";
import type { InitialStateType } from "../states/types";
import { axiosPost } from "../api/apiBase";
import { LOGOUT_ACCESS } from "../api/urls";
// import "./Header.scss";
import BurgerButton from "../libs/components/BurgerButton";
import homeIcon from "../static/images/houseIcon.png";
import { HOME, SEARCH } from "../api/urls";

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
    <NavLink
      className="NavLink"
      to={{
        pathname: "/",
        state: {
          url: HOME
        }
      }}
    >
      <img src={homeIcon} className="Icon" alt="Home Icon" />
    </NavLink>
  );
};

export const HeaderTitle = (): React.Node => {
  const history = useHistory();
  return (
    <h1
      className="Title"
      onClick={() => {
        history.replace("/", {
          url: HOME
        });
      }}
    >
      Quokka
    </h1>
  );
};

export const HeaderSearchBar = (): React.Node => {
  const [inputValue, setInputValue] = React.useState("");
  const history = useHistory();
  const submitSearch = (event: Event) => {
    event.preventDefault();
    history.replace("/search", {
      url: SEARCH,
      search_string: inputValue
    });
    setInputValue("");
  };

  return (
    <form className="SearchBar" autoComplete="Off" onSubmit={submitSearch}>
      <input
        type="search"
        name="search"
        value={inputValue}
        onChange={(event: Event): null => setInputValue(event.target.value)}
      />
    </form>
  );
};

type NavbarPropsType = $ReadOnly<{|
  ...InitialStateType,
  changeBurgerMenuVisibility: Object,
  handleLogout: Object,
  hideBurgerMenu: Object,
  t: Function
|}>;

export const HeaderNavbar = (props: NavbarPropsType): React.Node => {
  const history = useHistory();
  const { t, i18n } = useTranslation();

  const changeLanguage = (event: Event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <nav
      role="navigation"
      className={classNames({
        burgerVisible: props.burgerMenuVisible,
        burgerHidden: !props.burgerMenuVisible
      })}
    >
      <BurgerButton
        burgerMenuVisible={props.burgerMenuVisible}
        changeBurgerMenuVisibility={props.changeBurgerMenuVisibility}
      />
      <ul role="menubar" onClick={props.hideBurgerMenu}>
        <li>
          <NavLink
            className="NavLink"
            to={{
              pathname: "/",
              state: {
                url: HOME
              }
            }}
          >
            {t("HOME")}
          </NavLink>
        </li>
        <li>
          <NavLink className="NavLink" to="/services">
            {t("SERVICES")}
          </NavLink>
        </li>
        <div className="ProfileLinks">
          {props.isLogged ? (
            <React.Fragment>
              <li>
                <NavLink className="NavLink" to="/profile">
                  {t("PROFILE")}
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="LinkButton"
                  onClick={(event: Event): null =>
                    props.handleLogout(event, history)
                  }
                >
                  {t("LOGOUT")}
                </button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink className="NavLink" to="/login">
                  {t("LOGIN")}
                </NavLink>
              </li>
              <li>
                <NavLink className="NavLink" to="/register">
                  {t("REGISTER")}
                </NavLink>
              </li>
            </React.Fragment>
          )}
          <li>
            <select onChange={changeLanguage}>
              <option value="en">English</option>
              <option value="pl">Polski</option>
            </select>
          </li>
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

  handleLogout = (event: Event, history: Object) => {
    event.preventDefault();
    axiosPost(LOGOUT_ACCESS)
      .then((response: Object) => {
        this.props.logoutUser();
        history.push("/services");
        history.push("/");
      })
      .catch((error: Error) => {
        history.push("/message", {
          serverError: true
        });
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
          t={this.props.t}
        />
      </div>
    );
  }
}

export default connect<PropsType, InitialStateType, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(Header);
