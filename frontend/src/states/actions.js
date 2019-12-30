// @flow
import { LOGIN_USER, LOGOUT_USER, SHOW_BURGER_MENU, HIDE_BURGER_MENU } from './action-types';

export function loginUser(payload: Object) {
    return {type: LOGIN_USER, payload};
};

export function logoutUser(payload: Object) {
    return {type: LOGOUT_USER, payload};
};

export function showBurgerMenu(payload: Object) {
    return {type: SHOW_BURGER_MENU, payload}
};

export function hideBurgerMenu(payload: Object) {
    return {type: HIDE_BURGER_MENU, payload}
};