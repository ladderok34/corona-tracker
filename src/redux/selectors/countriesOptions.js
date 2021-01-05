import get from 'lodash/get'
import { initialState } from '../reducers/countriesOptions'

export const getSearchQuery = (state) => get(state, 'countriesOptions.searchQuery', initialState.searchQuery)
export const getSortingOption = (state) => get(state, 'countriesOptions.sortingOption', initialState.sortingOption)
