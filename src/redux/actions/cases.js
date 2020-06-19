import {
    FETCH_SUMMARY,
    FETCH_SUMMARY_ERROR,
    SHOW_SPINNER,
    SET_COUNTRY_SEARCH_QUERY,
    SET_COUNTRY_SORTING_OPTION,
} from '../types/cases';
import api from 'api/api';

const setFetchSummaryError = (isError) => dispatch => dispatch({ type: FETCH_SUMMARY_ERROR, payload: isError });
const setShowSpinner = (visible) => dispatch => dispatch({ type: SHOW_SPINNER, payload: visible });

export const fetchSummary = () => dispatch => {
    setShowSpinner(true)(dispatch);
    api.getSummary()
        .then(({ data }) => {
            dispatch({
                type: FETCH_SUMMARY,
                payload: data,
            });
            setFetchSummaryError(false)(dispatch);
        })
        .catch(() => setFetchSummaryError(true)(dispatch))
        .finally(() => setShowSpinner(false)(dispatch));
};

export const setCountrySearchQuery = (value) => dispatch => {
    dispatch({
        type: SET_COUNTRY_SEARCH_QUERY,
        payload: value,
    });
};

export const setCountrySortingOption = (name) => dispatch => {
    dispatch({
        type: SET_COUNTRY_SORTING_OPTION,
        payload: name,
    });
};
