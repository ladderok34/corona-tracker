import get from 'lodash/get';
import { initialState } from '../reducers/cases';

export const getTotalCases = state => get(state, 'cases.summary', initialState.total);
export const getCountriesCases = state => get(state, 'cases.countries', initialState.countries);
export const getSummaryLoadFailed = state => get(state, 'cases.summaryLoadFailed', initialState.summaryLoadFailed);
export const getShowSpinner = state => get(state, 'cases.showSpinner', initialState.showSpinner);
