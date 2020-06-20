import get from 'lodash/get';
import { initialState } from '../reducers/country';

export const getCountry = state => get(state, 'country.data', initialState.data);
export const getShowSpinner = state => get(state, 'country.showSpinner', initialState.showSpinner);
export const getFailedLoading = state => get(state, 'country.failedLoading', initialState.failedLoading);
