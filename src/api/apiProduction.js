import apiWrapper from './apiWrapper';

export const getSummary = () => apiWrapper.get('/summary');
export const getCountry = code => apiWrapper.get(`/total/country/${code}`);
