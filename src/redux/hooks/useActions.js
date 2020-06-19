import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

export function useActions(actions, deps) {
    const dispatch = useDispatch();

    console.log(actions);

    return useMemo(() => {
        if (Array.isArray(actions)) {
            return actions.map(a => bindActionCreators(a, dispatch));
        }
        return bindActionCreators(actions, dispatch);
    }, deps ? [dispatch, ...deps] : [dispatch]);
};