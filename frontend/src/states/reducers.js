// @flow
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

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLogged: false,
  burgerMenuVisible: false,
  favouriteArticles: [],
  favouriteServices: []
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
      return Object.assign({}, state, {
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        favouriteArticles: action.payload.favouriteArticles,
        favouriteServices: action.payload.favoutireServices,
        isLogged: Boolean(action.payload.accessToken)
      });
    case DELETE_USER:
    case LOGOUT_USER:
      return Object.assign({}, state, {
        email: "",
        accessToken: null,
        refreshToken: null,
        favouriteArticles: [],
        favouriteServices: [],
        isLogged: false
      });
    case SHOW_BURGER_MENU:
      return Object.assign({}, state, {
        burgerMenuVisible: true
      });
    case HIDE_BURGER_MENU:
      return Object.assign({}, state, {
        burgerMenuVisible: false
      });
    case ADD_FAV_ARTICLE:
    case REMOVE_FAV_ARTICLE:
      return Object.assign({}, state, {
        favouriteArticles: action.payload.favouriteArticles
      });
    case ADD_FAV_SERVICE:
    case REMOVE_FAV_SERVICE:
      return Object.assign({}, state, {
        favouriteServices: action.payload.favouriteServices
      });
    default:
      return state;
  }
};

export default rootReducer;
