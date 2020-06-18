import {
    FETCH_SUMMARY,
    FETCH_SUMMARY_ERROR,
    SHOW_SPINNER,
} from '../types/cases';

export const initialState = {
    total: {},
    countries: [],
    summaryLoadFailed: false,
    showSpinner: false,
};

const cases = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_SUMMARY:
            return {
                ...state,
                total: payload.Global,
                countries: payload.Countries,
            };
        case FETCH_SUMMARY_ERROR:
            return {
                ...state,
                summaryLoadFailed: payload,
            };
        case SHOW_SPINNER:
            return {
                ...state,
                showSpinner: payload,
            };
        default:
            return state;
    }
};

export default cases;
