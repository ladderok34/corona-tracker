import React, { useEffect, useCallback, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { SafeAreaView } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DefaultHeader from 'components/DefaultHeader/DefaultHeader';
import {
    getFavoritesCountriesData,
    getFavoritesCountryNames,
    getFavoritesLoaded,
} from 'selectors/favorites';
import {
    fetchFavoritesCountriesData,
    fetchFavoritesCountryNames,
    setFavoritesLoaded,
} from 'actions/favorites';
import { useActions } from 'reduxHooks/useActions';
import CountriesList from 'components/CountriesList/CountriesList';
import Empty from './components/Empty/Empty';

const remapCountries = (data, countryNames) => data.map((country) => {
    let currentCountryNames = countryNames.find(item => item.name === country.Country);

    if (!!currentCountryNames === false) {
        // only issue with on dev coz of mocked api data.
        currentCountryNames = { code: 'DK', name: 'Denmark' };
    }

    return {
        countryName: country.Country,
        countryCode: currentCountryNames.code,
        confirmed: country.Confirmed,
        deaths: country.Deaths,
        recovered: country.Recovered,
    };
});

const Favorites = () => {
    const navigation = useNavigation();
    const [
        fetchFavoritesCountriesDataDispatch,
        fetchFavoritesCountryNamesDispatch,
        setFavoritesLoadedDispatch,
    ]= useActions([
        fetchFavoritesCountriesData,
        fetchFavoritesCountryNames,
        setFavoritesLoaded,
    ]);

    const {
        countryNames,
        countriesData,
        isLoaded,
    } = useSelector(state => ({
        countryNames: getFavoritesCountryNames(state),
        countriesData: getFavoritesCountriesData(state),
        isLoaded: getFavoritesLoaded(state),
    }), shallowEqual);

    useEffect(() => {
        if (countryNames.length > 0) {
            fetchFavoritesCountriesDataDispatch(countryNames);
        } else {
            setFavoritesLoadedDispatch(true);
        }
    }, [countryNames]);

    const navigateToCountry = useCallback((name, code) => {
        navigation.navigate('Country', { name, code });
    }, []);

    return (
        <SafeAreaView>
            <DefaultHeader title="Favorites" />
            {!!countriesData.length && (
                <CountriesList
                    data={remapCountries(countriesData, countryNames)}
                    listItemOnPress={navigateToCountry}
                />
            )}
        </SafeAreaView>
    );
};

Favorites.displayName = 'Favorites';
export default Favorites;
