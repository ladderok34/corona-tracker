import React, { useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getShowSpinner, getSummaryLoadFailed, getTotalCases } from 'selectors/cases';
import { fetchSummary } from 'actions/cases';
import { fetchFavoritesCountryNames } from 'actions/favorites';
import { useActions } from 'reduxHooks/useActions';
import DefaultHeader from 'components/DefaultHeader/DefaultHeader';

const AllCases = () => {
    const navigation = useNavigation();
    const [
        fetchSummaryDispatch,
        fetchFavoritesCountryNamesDispatch,
    ] = useActions([
        fetchSummary,
        fetchFavoritesCountryNames,
    ]);

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
        fetchFavoritesCountryNamesDispatch();
    }, []);

    const navigateToCase = useCallback((name) => {
        navigation.navigate('Case', { name });
    }, []);

    return (
        <SafeAreaView>
            <DefaultHeader title="All cases" />
        </SafeAreaView>
    );
};

AllCases.displayName = 'AllCases';
export default AllCases;
