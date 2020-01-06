// @flow
import {
  LOGIN_USER,
  LOGOUT_USER,
  SHOW_BURGER_MENU,
  HIDE_BURGER_MENU,
  REGISTER_USER
} from "./action-types";
import type { InitialStateType } from "./types";

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLogged: false,
  burgerMenuVisible: false
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
        isLogged: Boolean(action.payload.accessToken)
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        email: "",
        accessToken: null,
        refreshToken: null,
        isLogged: false
      });
    case REGISTER_USER:
      return Object.assign({}, state, {
        email: action.payload.email,
        password: action.payload.password,
        repeatPassword: action.payload.repeatPassword
      });
    case SHOW_BURGER_MENU:
      return Object.assign({}, state, {
        burgerMenuVisible: true
      });
    case HIDE_BURGER_MENU:
      return Object.assign({}, state, {
        burgerMenuVisible: false
      });
    default:
      return state;
  }
};

export default rootReducer;
