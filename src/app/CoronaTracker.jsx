import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { setAllCases } from 'actions/cases';
import { getAllCases } from 'selectors/cases';
import { useActions } from 'reduxHooks/useActions';
import { useShallowEqualSelector } from 'reduxHooks/useShallowEqualSelector';

const CoronaTracker = () => {
    const setAllCasesDispatch = useActions(setAllCases);

    const {
        cases,
    } = useShallowEqualSelector(state => ({
        cases: getAllCases(state),
    }));

    useEffect(() => {
        setAllCasesDispatch();
    }, []);

    console.log(cases);

    return (
        <View>
            <Text>Corona Tracker</Text>
        </View>
    );
};

export default CoronaTracker;
