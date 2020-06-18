import get from 'lodash/get';
import { initialState } from '../reducers/cases';

export const getAllCases = state => get(state, 'cases.all', initialState.all);
