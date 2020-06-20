import {
    SET_SEARCH_QUERY,
    SET_SORTING_OPTION,
} from '../types/countriesOptions';

export const initialState = {
    searchQuery: '',
    sortingOption: 'total',
};

const countriesOptions = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: payload,
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
