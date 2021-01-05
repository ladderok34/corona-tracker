import { SET_COUNTRY, SET_COUNTRY_LOADED, SET_COUNTRY_ERROR } from '../types/country'
import api from 'api/api'

const setCountryLoaded = (loaded) => (dispatch) => dispatch({ type: SET_COUNTRY_LOADED, payload: loaded })
const setCountryError = (isError) => (dispatch) => dispatch({ type: SET_COUNTRY_ERROR, payload: isError })
export const setCountry = (data) => (dispatch) => dispatch({ type: SET_COUNTRY, payload: data })

export const fetchCountry = (code, params, countryData, date) => (dispatch) => {
  dispatch(setCountryLoaded(false))
  api
    .getCountry(`${code}?from=${params.from}&to=${params.to}`)
    .then(({ data }) => {
      let returnData = {}

      if (date === 'Yesterday') {
        returnData = { ...data[data.length - 1] }
      } else {
        returnData = { ...data[0] }
      }

      dispatch(
        setCountry({
          ...countryData,
          confirmed: returnData.Confirmed,
          deaths: returnData.Deaths,
          recovered: returnData.Recovered,
        })
      )
      dispatch(setCountryError(false))
    })
    .catch(() => dispatch(setCountryError(true)))
    .finally(() => dispatch(setCountryLoaded(true)))
}
