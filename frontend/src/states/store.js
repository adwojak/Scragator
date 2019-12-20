import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers";
import { forbiddenWordsMiddleware } from './middleware';

export default createStore(
    rootReducer,
    applyMiddleware(forbiddenWordsMiddleware)
);