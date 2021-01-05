import { SET_CASES, SET_CASES_ERROR, SET_CASES_LOADED } from '../types/cases'

export const initialState = {
  total: {},
  countries: [],
  isError: false,
  isLoaded: false,
}

const cases = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CASES:
      return {
        ...state,
        total: payload.Global,
        countries: payload.Countries,
      }
    case SET_CASES_ERROR:
      return {
        ...state,
        isError: payload,
      }
    case SET_CASES_LOADED:
      return {
        ...state,
        isLoaded: payload,
      }
    default:
      return state
  }
}

export default cases
