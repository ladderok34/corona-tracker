import {
    SET_SEARCH_QUERY,
    SET_SORTING_OPTION,
    RESET_SEARCH,
} from '../types/countriesOptions';

export const setSearchQuery = (value) => dispatch => {
    dispatch({
        type: SET_SEARCH_QUERY,
        payload: value,
    });
};

export const resetSearch = () => dispatch => dispatch({ type: RESET_SEARCH });

export const setSortingOption = (name) => dispatch => {
    dispatch({
        type: SET_SORTING_OPTION,
        payload: name,
    });
};
