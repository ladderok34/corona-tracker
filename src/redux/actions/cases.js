import { SET_ALL_CASES } from '../types/cases';

export const setAllCases = () => dispatch => {
    dispatch({
        type: SET_ALL_CASES,
        payload: ['all'],
    });
};
