import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useActions } from 'reduxHooks/useActions';
import { Container, Content } from 'native-base';
import { fetchSummary } from 'actions/cases';
import { getCountrySearchQuery, getCountrySortingOption } from 'selectors/cases';
import {
    getCountriesCases,
    getSummaryLoadFailed,
    getShowSpinner,
} from 'selectors/cases';
import LoadingFailedView from './components/LoadingFailedView/LoadingFailedView';
import List from './components/List/List';
import { ActivityIndicator } from 'react-native';
import { findCountriesByName, sortCountries } from './Countries.utils';
import Header from './components/Header/Header';

const contentProps = {
    contentContainerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
};

const Countries = () => {
    const navigation = useNavigation();
    const fetchSummaryDispatch = useActions(fetchSummary);

    const {
        countries,
        summaryLoadFailed,
        showSpinner,
        searchQuery,
        sortingOption,
    } = useSelector(state => ({
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
        <Container>
            <Header />
            <Content
                {...((summaryLoadFailed || showSpinner) ? { contentProps } : {})}
            >
                {summaryLoadFailed && <LoadingFailedView fetchSummary={fetchSummaryDispatch} />}
                {showSpinner && <ActivityIndicator size="large" />}
                {sortedCountries.length > 0 && (
                    <List
                        countries={sortedCountries}
                        navigateToCountry={navigateToCountry}
                    />
                )}
            </Content>
        </Container>
    );
};

Countries.displayName = 'Countries';
export default React.memo(Countries);
