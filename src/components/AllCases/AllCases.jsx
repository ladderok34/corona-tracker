import React, { useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { Container, Content } from 'native-base';
import { getShowSpinner, getSummaryLoadFailed, getTotalCases } from 'selectors/cases';
import { fetchSummary } from 'actions/cases';
import { useActions } from 'reduxHooks/useActions';
import Header from './components/Header/Header';
import List from './components/List/List';
import LoadingFailed from 'components/LoadingFailed/LoadingFailed';

const contentContainerStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' };

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
        <Container>
            <Header openDrawer={openDrawer} />
            <Content
                contentContainerStyle={(summaryLoadFailed || showSpinner) ? contentContainerStyle : {}}
            >
                {showSpinner && <ActivityIndicator size="large" />}
                {summaryLoadFailed && <LoadingFailed refetch={fetchSummaryDispatch} />}
                {Object.keys(totalCases).length > 0 && (
                    <List
                        cases={totalCases}
                        navigateToCase={navigateToCase}
                    />
                )}
            </Content>
        </Container>
    );
};

AllCases.displayName = 'AllCases';
export default React.memo(AllCases);
