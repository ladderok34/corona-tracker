import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import casesReducer from 'reducers/cases';
import countriesOptionsReducer from 'reducers/countriesOptions';

export default function configureStore(initialState = {}) {
    return createStore(
        combineReducers({
            cases: casesReducer,
            countriesOptions: countriesOptionsReducer,
        }),
        initialState,
        applyMiddleware(thunk)
    );
}
