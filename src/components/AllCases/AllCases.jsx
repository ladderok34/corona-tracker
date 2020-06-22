import React, { useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getShowSpinner, getSummaryLoadFailed, getTotalCases } from 'selectors/cases';
import { fetchSummary } from 'actions/cases';
import { useActions } from 'reduxHooks/useActions';
import DefaultHeader from 'components/DefaultHeader/DefaultHeader';
import List from './components/List/List';
import Container from 'components/Container/Container';

const AllCases = () => {
    const navigation = useNavigation();
    const fetchSummaryDispatch = useActions(fetchSummary);

    const {
        summaryLoadFailed,
        showSpinner,
        totalCases,
    } = useSelector(state => ({
        summaryLoadFailed: getSummaryLoadFailed(state),
        showSpinner: getShowSpinner(state),
        totalCases: getTotalCases(state),
    }), shallowEqual);

    useEffect(() => {
        fetchSummaryDispatch();
    }, []);

    const navigateToCase = useCallback((name) => {
        navigation.navigate('Case', { name });
    }, []);

    return (
        <Container
            showSpinner={showSpinner}
            failedLoading={summaryLoadFailed}
            refetch={fetchSummaryDispatch}
            header={<DefaultHeader title="All cases" />}
        >
            {Object.keys(totalCases).length > 0 && (
                <List
                    cases={totalCases}
                    navigateToCase={navigateToCase}
                />
            )}
        </Container>
    );
};

AllCases.displayName = 'AllCases';
export default AllCases;
