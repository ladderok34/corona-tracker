import {
    FETCH_SUMMARY,
    FETCH_SUMMARY_ERROR,
    SHOW_SPINNER,
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
