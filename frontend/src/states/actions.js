import { LOGIN_USER, LOGOUT_USER, SHOW_BURGER_MENU, HIDE_BURGER_MENU } from './action-types';

export function loginUser(payload) {
    return {type: LOGIN_USER, payload};
};

export function logoutUser(payload) {
    return {type: LOGOUT_USER, payload};
};

export function showBurgerMenu(payload) {
    return {type: SHOW_BURGER_MENU, payload}
};

export function hideBurgerMenu(payload) {
    return {type: HIDE_BURGER_MENU, payload}
};