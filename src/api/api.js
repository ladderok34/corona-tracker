import * as apiDev from './apiDev';
import * as apiProduction from './apiProduction';

const { NODE_ENV } = process.env;
let api;

if (NODE_ENV === 'development') {
    api = apiDev;
} else {
    api = apiProduction;
}

export default api;