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
  REMOVE_FAV_SERVICE
} from "./action-types";
import type { InitialStateType } from "./types";

const cookies = new Cookies();
const initialState = {
  isLogged: Boolean(cookies.get("accessToken")),
  burgerMenuVisible: false,
  favouriteArticles: cookies.get("favouriteArticles") || [],
  favouriteServices: cookies.get("favouriteServices") || []
};

type ActionType = $ReadOnly<{|
  type: string,
  payload: {
    email: string,
    password: string
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
      const favouriteArticles = action.payload.favouriteArticles;
      cookies.set("favouriteArticles", favouriteArticles);
      return Object.assign({}, state, {
        favouriteArticles: favouriteArticles
      });
    case ADD_FAV_SERVICE:
    case REMOVE_FAV_SERVICE:
      const favouriteServices = action.payload.favouriteServic;
      cookies.set("favouriteServices", favouriteServices);
      return Object.assign({}, state, {
        favouriteServices: favouriteServices
      });
    default:
      return state;
  }
};

export default rootReducer;
