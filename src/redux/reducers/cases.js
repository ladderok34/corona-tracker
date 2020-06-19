import {
    FETCH_SUMMARY,
    FETCH_SUMMARY_ERROR,
    SHOW_SPINNER,
    SET_COUNTRY_SEARCH_QUERY,
    SET_COUNTRY_SORTING_OPTION,
} from '../types/cases';

export const initialState = {
    total: {},
    countries: [],
    summaryLoadFailed: false,
    showSpinner: false,
    countrySearchQuery: '',
    countrySortingOption: 'total',
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
        case SET_COUNTRY_SEARCH_QUERY:
            return {
                ...state,
                countrySearchQuery: payload,
            };
        case SET_COUNTRY_SORTING_OPTION:
            return {
                ...state,
                countrySortingOption: payload,
            };
        default:
            return state;
    }
};

export default cases;
