import React, { useEffect, useCallback, useRef } from 'react';
import isEqual from 'lodash/isEqual';
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
    setFavoritesCountriesData,
} from 'actions/favorites';
import { useActions } from 'reduxHooks/useActions';
import CountriesList from 'components/CountriesList/CountriesList';
import Container from 'components/Container/Container';
import { remapCountries } from './Favorites.utils';
import Empty from './components/Empty/Empty';

const Favorites = () => {
    const navigation = useNavigation();
    const [
        fetchFavoritesCountriesDataDispatch,
        fetchFavoritesCountryNamesDispatch,
        setFavoritesLoadedDispatch,
        setFavoritesCountriesDataDispatch,
    ]= useActions([
        fetchFavoritesCountriesData,
        fetchFavoritesCountryNames,
        setFavoritesLoaded,
        setFavoritesCountriesData,
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
            setFavoritesCountriesDataDispatch([]);
        }
    }, [countryNames]);

    const navigateToCountry = useCallback((name, code) => {
        navigation.navigate('Country', { name, code });
    }, []);

    return (
        <Container
            isLoaded={isLoaded}
            header={<DefaultHeader title="Favorites" />}
            centered={!isLoaded || (isLoaded && !!countriesData.length === false)}
        >
            {isLoaded && !!countriesData.length === false && <Empty />}
            {!!countriesData.length && (
                <CountriesList
                    data={remapCountries(countriesData, countryNames)}
                    listItemOnPress={navigateToCountry}
                />
            )}
        </Container>
    );
};

Favorites.displayName = 'Favorites';
export default Favorites;
