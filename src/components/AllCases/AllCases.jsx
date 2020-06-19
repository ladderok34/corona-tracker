import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useActions } from 'reduxHooks/useActions';
import { fetchSummary } from 'actions/cases';
import { getCountrySearchQuery, getCountrySortingOption } from 'selectors/cases';
import {
    getTotalCases,
    getCountriesCases,
    getSummaryLoadFailed,
    getShowSpinner,
} from 'selectors/cases';
import Layout from 'components/Layout/Layout';
import FailedLoading from './components/FailedLoading/FailedLoading';
import CountriesList from './components/CountriesList/CountriesList';
import { ActivityIndicator } from 'react-native';
import { findCountriesByName, sortCountries } from './AllCases.utils';

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
        searchQuery,
        sortingOption,
    } = useSelector(state => ({
        total: getTotalCases(state),
        countries: getCountriesCases(state),
        summaryLoadFailed: getSummaryLoadFailed(state),
        showSpinner: getShowSpinner(state),
        searchQuery: getCountrySearchQuery(state),
        sortingOption: getCountrySortingOption(state),
    }), shallowEqual);

    const [sortedCountries, setSortedCountries] = useState([]);

    useEffect(() => {
        fetchSummaryDispatch();
    }, []);

    useEffect(() => {
        if (countries.length > 0) {
            let list = [];

            if (searchQuery.length > 1) {
                list = findCountriesByName(searchQuery, countries);
            } else {
                list = [...countries];
            }

            list = sortCountries(list, sortingOption);
            setSortedCountries(list);
        }
    }, [searchQuery, sortingOption, countries]);

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
            {sortedCountries.length > 0 && (
                <CountriesList
                    countries={sortedCountries}
                    navigateToCountry={navigateToCountry}
                />
            )}
        </Layout>
    );
};

AllCases.displayName = 'AllCases';
export default React.memo(AllCases);
