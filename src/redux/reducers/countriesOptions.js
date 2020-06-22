import {
    SET_SEARCH_QUERY,
    SET_SORTING_OPTION,
    RESET_SEARCH,
} from '../types/countriesOptions';

export const initialState = {
    searchQuery: '',
    sortingOption: 'total desc',
};

const countriesOptions = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: payload,
            };
        case RESET_SEARCH:
            return {
                ...state,
                searchQuery: initialState.searchQuery,
            };
        case SET_SORTING_OPTION:
            return {
                ...state,
                sortingOption: payload,
            };
        default:
            return state;
    }
};

export default countriesOptions;
