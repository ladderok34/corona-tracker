import {
    FETCH_COUNTRY,
    SHOW_SPINNER,
    FETCH_ERROR,
} from '../types/country';
import api from 'api/api';

const setShowSpinner = (visible) => dispatch => dispatch({ type: SHOW_SPINNER, payload: visible });
const setFetchError = (isError) => dispatch => dispatch({ type: FETCH_ERROR, payload: isError });

export const fetchCountryInfo = (code) => dispatch => {
    setShowSpinner(true)(dispatch);
    api.getCountry(code)
        .then(({ data }) => {
            dispatch({
                type: FETCH_COUNTRY,
                payload: data,
            });
            setFetchError(false)(dispatch);
        })
        .catch(() => setFetchError(true)(dispatch))
        .finally(() => setShowSpinner(false)(dispatch));
};

export const unsetCountryInfo = () => dispatch => {
    dispatch({
        type: FETCH_COUNTRY,
        payload: [],
    });
};
