import {
    SET_COUNTRY,
    SET_COUNTRY_LOADED,
    SET_COUNTRY_ERROR,
} from '../types/country';
import api from 'api/api';

const setCountryLoaded = (loaded) => dispatch => dispatch({ type: SET_COUNTRY_LOADED, payload: loaded });
const setCountryError = (isError) => dispatch => dispatch({ type: FETCH_ERROR, payload: SET_COUNTRY_ERROR });

export const fetchCountryInfo = (code) => dispatch => {
    dispatch(setCountryLoaded(false));
    api.getCountry(code)
        .then(({ data }) => {
            dispatch({
                type: SET_COUNTRY,
                payload: data,
            });
            dispatch(setCountryError(false));
        })
        .catch(() => dispatch(setCountryError(true)))
        .finally(() => dispatch(setCountryLoaded(true)));
};

export const unsetCountryInfo = () => dispatch => dispatch({ type: SET_COUNTRY, payload: [] });
