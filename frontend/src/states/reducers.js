import { ADD_ARTICLE, REMOVE_ARTICLE } from './action-types';

const initialState = {
    articles: []
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
    return state;
}

export default rootReducer;