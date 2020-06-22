import {
    SET_FAVORITES_COUNTRY_NAMES,
    SET_FAVORITES_LOADED,
    SET_FAVORITES_COUNTRIES_DATA,
} from '../types/favorites';

export const initialState = {
    countryNames: [],
    countriesData: [],
    isLoaded: false,
};

const favorites = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_FAVORITES_COUNTRY_NAMES:
            return { ...state, countryNames: payload };
        case SET_FAVORITES_COUNTRIES_DATA:
            return { ...state, countriesData: payload };
        case SET_FAVORITES_LOADED:
            return { ...state, isLoaded: payload };
        default:
            return state;
    }
};

export default favorites;
