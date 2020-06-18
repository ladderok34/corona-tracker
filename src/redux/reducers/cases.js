import { SET_ALL_CASES } from '../types/cases';

export const initialState = {
    all: [],
};

const cases = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ALL_CASES:
            return { ...state, all: payload };
        default:
            return state;
    }
};

export default cases;
