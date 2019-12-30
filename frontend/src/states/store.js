// @flow
import { createStore } from 'redux';
import rootReducer from "./reducers";

export default createStore<Object, Object, null>(
    rootReducer
);