import {
    SET_COUNTRY,
    SET_COUNTRY_LOADED,
    SET_COUNTRY_ERROR,
} from '../types/country';

export const initialState = {
    data: {},
    isLoaded: false,
    isError: false,
};

const country = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_COUNTRY:
            return {
                ...state,
                data: payload,
            };
        case SET_COUNTRY_LOADED:
            return {
                ...state,
                isLoaded: payload,
            };
        case SET_COUNTRY_ERROR:
            return {
                ...state,
                isError: payload,
            };
        default:
            return state;
    }
};

export default country;
