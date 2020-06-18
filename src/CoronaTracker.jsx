import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { setAllCases } from 'actions/cases';
import { getAllCases } from 'selectors/cases';
import { useActions } from 'reduxHooks/useActions';
import { useShallowEqualSelector } from 'reduxHooks/useShallowEqualSelector';
import Layout from 'components/Layout/Layout';

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

    return (
        <Layout>
            <Text>Corona Tracker</Text>
        </Layout>
    );
};

export default CoronaTracker;
