import React, { useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { getShowSpinner, getSummaryLoadFailed, getTotalCases } from 'selectors/cases';
import { fetchSummary } from 'actions/cases';
import { useActions } from 'reduxHooks/useActions';
import Header from './components/Header/Header';
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

    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer());
    }, []);

    const navigateToCase = useCallback((name) => {
        navigation.navigate('Case', { name });
    }, []);

    return (
        <Container
            showSpinner={showSpinner}
            failedLoading={summaryLoadFailed}
            refetch={fetchSummaryDispatch}
            header={<Header openDrawer={openDrawer} />}
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
