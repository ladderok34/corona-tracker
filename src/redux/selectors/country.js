import get from 'lodash/get';
import { initialState } from '../reducers/country';

export const getCountry = state => get(state, 'country.data', initialState.data);
export const getIsCountryLoaded = state => false; //get(state, 'country.isLoaded', initialState.isLoaded);
export const getIsCountryError = state => get(state, 'country.isError', initialState.isError);
