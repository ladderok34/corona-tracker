import apiWrapper from './apiWrapper';

export const getSummary = () => apiWrapper.get('/summary');
