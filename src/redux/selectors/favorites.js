import get from 'lodash/get';
import { initialState } from '../reducers/favorites';

export const getFavoritesCountryNames = state => get(state, 'favorites.countryNames', initialState.countryNames);
export const getFavoritesCountriesData = state => get(state, 'favorites.countriesData', initialState.countriesData);
export const getFavoritesLoaded = state => get(state, 'favorites.isLoaded', initialState.isLoaded);
