// @flow
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  SHOW_BURGER_MENU,
  HIDE_BURGER_MENU
} from "./action-types";
import type { ActionReturnType } from "./types";

export const loginUser = (payload: Object): ActionReturnType => {
  return { type: LOGIN_USER, payload };
};

export const logoutUser = (payload: Object): ActionReturnType => {
  return { type: LOGOUT_USER, payload };
};

export const registerUser = (payload: Object): ActionReturnType => {
  return { type: REGISTER_USER, payload };
};

export const showBurgerMenu = (payload: Object): ActionReturnType => {
  return { type: SHOW_BURGER_MENU, payload };
};

export const hideBurgerMenu = (payload: Object): ActionReturnType => {
  return { type: HIDE_BURGER_MENU, payload };
};
