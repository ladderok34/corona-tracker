import {
    FETCH_COUNTRY,
    SHOW_SPINNER,
    FETCH_ERROR,
} from '../types/country';

export const initialState = {
    data: {},
    showSpinner: false,
    failedLoading: false,
};

const country = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_COUNTRY:
            return {
                ...state,
                data: payload,
            };
        case SHOW_SPINNER:
            return {
                ...state,
                showSpinner: payload,
            };
        case FETCH_ERROR:
            return {
                ...state,
                failedLoading: payload,
            };
        default:
            return state;
    }
};

export default country;
