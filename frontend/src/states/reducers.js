// @flow
import Cookies from "universal-cookie";
import {
  LOGIN_USER,
  LOGOUT_USER,
  DELETE_USER,
  SHOW_BURGER_MENU,
  HIDE_BURGER_MENU,
  ADD_FAV_ARTICLE,
  REMOVE_FAV_ARTICLE,
  ADD_FAV_SERVICE,
  REMOVE_FAV_SERVICE,
  SHOW_POPUP
} from "./action-types";
import type { InitialStateType } from "./types";

const cookies = new Cookies();
const initialState = {
  isLogged: Boolean(cookies.get("accessToken")),
  favouriteArticles: cookies.get("favouriteArticles") || [],
  favouriteServices: cookies.get("favouriteServices") || [],
  burgerMenuVisible: false,
  showPopup: false
};

type ActionType = $ReadOnly<{|
  type: string,
  payload: {
    email: string,
    accessToken: string,
    refreshToken: string,
    favouriteArticles: Array,
    favouriteServices: Array,
    isLogged: boolean,
    showPopup: boolean
  }
|}>;

const rootReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): Object => {
  switch (action.type) {
    case LOGIN_USER:
      cookies.set("accessToken", action.payload.accessToken);
      cookies.set("refreshToken", action.payload.refreshToken);
      cookies.set("favouriteArticles", action.payload.favouriteArticles);
      cookies.set("favouriteServices", action.payload.favouriteServices);
      return Object.assign({}, state, {
        email: action.payload.email,
        favouriteArticles: action.payload.favouriteArticles,
        favouriteServices: action.payload.favoutireServices,
        isLogged: true
      });
    case DELETE_USER:
    case LOGOUT_USER:
      cookies.remove("accessToken");
      cookies.remove("refreshToken");
      cookies.remove("favouriteArticles");
      cookies.remove("favouriteServices");
      return Object.assign({}, state, {
        email: "",
        favouriteArticles: [],
        favouriteServices: [],
        isLogged: false
      });
    case SHOW_BURGER_MENU:
      console.log(cookies.get("accessToken"));
      return Object.assign({}, state, {
        burgerMenuVisible: true
      });
    case HIDE_BURGER_MENU:
      return Object.assign({}, state, {
        burgerMenuVisible: false
      });
    case ADD_FAV_ARTICLE:
    case REMOVE_FAV_ARTICLE:
      cookies.set("favouriteArticles", action.payload.favouriteArticles);
      return Object.assign({}, state, {
        favouriteArticles: action.payload.favouriteArticles
      });
    case ADD_FAV_SERVICE:
    case REMOVE_FAV_SERVICE:
      cookies.set("favouriteServices", action.payload.favouriteServices);
      return Object.assign({}, state, {
        favouriteServices: action.payload.favouriteServices
      });
    case SHOW_POPUP:
      return Object.assign({}, state, {
        showPopup: action.payload.showPopup
      });
    default:
      return state;
  }
};

export default rootReducer;
