import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import casesReducer from 'reducers/cases';

export default function configureStore(initialState = {}) {
    return createStore(
        combineReducers({ cases: casesReducer }),
        initialState,
        applyMiddleware(thunk)
    );
}
