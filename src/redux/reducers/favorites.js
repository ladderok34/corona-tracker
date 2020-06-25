import { SET_FAVORITES } from '../types/favorites';

export const initialState = {
    countries: [],
};

const favorites = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_FAVORITES:
            return { ...state, countries: payload };
        default:
            return state;
    }
};

export default favorites;
