import get from 'lodash/get';
import { initialState } from '../reducers/favorites';

export const getFavorites = state => get(state, 'favorites.countries', initialState.countries);
