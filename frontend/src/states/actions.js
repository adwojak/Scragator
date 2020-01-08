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
  REMOVE_FAV_SERVICE,
  SHOW_POPUP
} from "./action-types";
import type { ActionReturnType } from "./types";

export const loginUser = (payload: Object): ActionReturnType => {
  return { type: LOGIN_USER, payload };
};

export const logoutUser = (payload: Object): ActionReturnType => {
  return { type: LOGOUT_USER, payload };
};

export const deleteUser = (payload: Object): ActionReturnType => {
  return { type: DELETE_USER, payload };
};

export const showBurgerMenu = (payload: Object): ActionReturnType => {
  return { type: SHOW_BURGER_MENU, payload };
};

export const hideBurgerMenu = (payload: Object): ActionReturnType => {
  return { type: HIDE_BURGER_MENU, payload };
};

export const addFavArticle = (payload: Object): ActionReturnType => {
  return { type: ADD_FAV_ARTICLE, payload };
};

export const removeFavArticle = (payload: Object): ActionReturnType => {
  return { type: REMOVE_FAV_ARTICLE, payload };
};

export const addFavService = (payload: Object): ActionReturnType => {
  return { type: ADD_FAV_SERVICE, payload };
};

export const removeFavService = (payload: Object): ActionReturnType => {
  return { type: REMOVE_FAV_SERVICE, payload };
};

export const showPopup = (payload: Object): ActionReturnType =>  {
  return { type: SHOW_POPUP, payload };
};