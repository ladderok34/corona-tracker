import apiWrapper from './apiWrapper'

export const getSummary = () => apiWrapper.get('/summary')
export const getCountry = (params) => apiWrapper.get(`/total/country/${params}`)
