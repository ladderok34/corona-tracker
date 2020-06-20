import {
    SET_SEARCH_QUERY,
    SET_SORTING_OPTION,
} from '../types/countriesOptions';

export const setSearchQuery = (value) => dispatch => {
    dispatch({
        type: SET_SEARCH_QUERY,
        payload: value,
    });
};

export const setSortingOption = (name) => dispatch => {
    dispatch({
        type: SET_SORTING_OPTION,
        payload: name,
    });
};
