import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getSearchQuery, getSortingOption } from 'selectors/countriesOptions';
import { getCountriesCases } from 'selectors/cases';
import List from './components/List/List';
import { findCountriesByName, sortCountries } from './Countries.utils';
import Header from './components/Header/Header';
import Container from 'components/Container/Container';

const Countries = () => {
    const navigation = useNavigation();
    const [sortedCountries, setSortedCountries] = useState([]);

    const {
        countries,
        searchQuery,
        sortingOption,
    } = useSelector(state => ({
        countries: getCountriesCases(state),
        searchQuery: getSearchQuery(state),
        sortingOption: getSortingOption(state),
    }), shallowEqual);

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
    }, []);

    return (
        <Container header={<Header />}>
            {sortedCountries.length > 0 && (
                <List
                    countries={sortedCountries}
                    navigateToCountry={navigateToCountry}
                />
            )}
        </Container>
    );
};

Countries.displayName = 'Countries';
export default Countries;
