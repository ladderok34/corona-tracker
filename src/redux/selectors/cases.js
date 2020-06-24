import get from 'lodash/get';
import { initialState } from '../reducers/cases';

export const getTotalCases = state => get(state, 'cases.total', initialState.total);
export const getCountriesCases = state => get(state, 'cases.countries', initialState.countries);
export const getIsCasesError = state => get(state, 'cases.isError', initialState.isError);
export const getIsCasesLoaded = state => get(state, 'cases.isLoaded', initialState.isLoaded);
