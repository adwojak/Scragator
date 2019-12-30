import { LOGIN_USER, LOGOUT_USER, SHOW_BURGER_MENU, HIDE_BURGER_MENU } from './action-types';

const initialState = {
    articles: [],
    isLogged: false,
    burgerMenuVisible: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, {
                login: action.payload.login,
                password: action.payload.password,
                isLogged: true
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                login: '',
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