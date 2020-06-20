import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Container, Content } from 'native-base';
import { getSearchQuery, getSortingOption } from 'selectors/countriesOptions';
import { getCountriesCases } from 'selectors/cases';
import List from './components/List/List';
import { findCountriesByName, sortCountries } from './Countries.utils';
import Header from './components/Header/Header';

const Countries = () => {
    const navigation = useNavigation();

    const {
        countries,
        searchQuery,
        sortingOption,
    } = useSelector(state => ({
        countries: getCountriesCases(state),
        searchQuery: getSearchQuery(state),
        sortingOption: getSortingOption(state),
    }), shallowEqual);

    const [sortedCountries, setSortedCountries] = useState([]);

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
            <Content>
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
