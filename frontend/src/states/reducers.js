import { ADD_ARTICLE, REMOVE_ARTICLE, LOGIN_USER, LOGOUT_USER } from './action-types';

const initialState = {
    articles: [],
    isLogged: false
};

const rootReducer = (state = initialState, action) => {
    if (action.type == ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        });
    } else if (action.type == REMOVE_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.filter(article => article.title !== action.payload.title)
        })
    }

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
    }
    return state;
}

export default rootReducer;