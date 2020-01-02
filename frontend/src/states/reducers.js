// @flow
import { LOGIN_USER, LOGOUT_USER, SHOW_BURGER_MENU, HIDE_BURGER_MENU } from './action-types';
import type { InitialStateType } from './types';

const initialState = {
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

const rootReducer = (state: InitialStateType = initialState, action: ActionType): Object => {
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, {
                email: action.payload.email,
                password: action.payload.password,
                isLogged: true
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                email: '',
                password: '',
                isLogged: false
            })
        case SHOW_BURGER_MENU:
            return Object.assign({}, state, {
                burgerMenuVisible: true
            })
        case HIDE_BURGER_MENU:
                return Object.assign({}, state, {
                    burgerMenuVisible: false
                })
        default:
            return state;
    }
}

export default rootReducer;