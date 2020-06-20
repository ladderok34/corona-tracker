import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import casesReducer from 'reducers/cases';
import countriesOptionsReducer from 'reducers/countriesOptions';
import countryReducer from 'reducers/country';

export default function configureStore(initialState = {}) {
    return createStore(
        combineReducers({
            cases: casesReducer,
            countriesOptions: countriesOptionsReducer,
            country: countryReducer,
        }),
        initialState,
        applyMiddleware(thunk)
    );
}
