import { SET_CASES, SET_CASES_ERROR, SET_CASES_LOADED } from '../types/cases'
import api from 'api/api'

const setCasesError = (isError) => (dispatch) => dispatch({ type: SET_CASES_ERROR, payload: isError })
const setCasesLoaded = (loaded) => (dispatch) => dispatch({ type: SET_CASES_LOADED, payload: loaded })

export const fetchCases = () => (dispatch) => {
  dispatch(setCasesLoaded(false))
  api
    .getSummary()
    .then(({ data }) => {
      dispatch({
        type: SET_CASES,
        payload: data,
      })
      dispatch(setCasesError(false))
    })
    .catch(() => dispatch(setCasesError(true)))
    .finally(() => dispatch(setCasesLoaded(true)))
}
