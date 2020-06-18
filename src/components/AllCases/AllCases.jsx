import React, { useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchSummary } from 'actions/cases';
import {
    getTotalCases,
    getCountriesCases,
    getSummaryLoadFailed,
    getShowSpinner,
} from 'selectors/cases';
import { useActions } from 'reduxHooks/useActions';
import Layout from 'components/Layout/Layout';
import FailedLoading from './components/FailedLoading/FailedLoading';
import CountriesList from './components/CountriesList/CountriesList';
import { ActivityIndicator } from 'react-native';

const contentProps = {
    contentContainerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
};

const AllCases = () => {
    const navigation = useNavigation();
    const fetchSummaryDispatch = useActions(fetchSummary);

    const {
        total,
        countries,
        summaryLoadFailed,
        showSpinner,
    } = useSelector(state => ({
        total: getTotalCases(state),
        countries: getCountriesCases(state),
        summaryLoadFailed: getSummaryLoadFailed(state),
        showSpinner: getShowSpinner(state),
    }), shallowEqual);

    useEffect(() => {
        fetchSummaryDispatch();
    }, []);

    const navigateToCountry = useCallback((code) => {
        navigation.navigate('Country', {
            countryCode: code,
        });
    }, [navigation]);

    return (
        <Layout
            {...((summaryLoadFailed || showSpinner) ? { contentProps } : {})}
        >
            {summaryLoadFailed && <FailedLoading fetchSummary={fetchSummaryDispatch} />}
            {showSpinner && <ActivityIndicator size="large" />}
            {countries.length > 0 && (
                <CountriesList
                    countries={countries}
                    navigateToCountry={navigateToCountry}
                />
            )}
        </Layout>
    );
};

AllCases.displayName = 'AllCases';
export default React.memo(AllCases);
