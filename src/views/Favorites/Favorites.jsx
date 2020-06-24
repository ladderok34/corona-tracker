import React, { useEffect, useCallback, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DefaultHeader from 'components/DefaultHeader/DefaultHeader';
import Container from 'components/Container/Container';
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
import List from './components/List/List';
import Empty from './components/Empty/Empty';

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
        <Container
            header={<DefaultHeader title="Favorites" />}
            showSpinner={!isLoaded}
        >
            {isLoaded && !!countriesData.length === false && <Empty />}
            {isLoaded && !!countriesData.length === true && (
                <List
                    countries={countriesData}
                    countryNames={countryNames}
                    navigateToCountry={navigateToCountry}
                />
            )}
        </Container>
    );
};

Favorites.displayName = 'Favorites';
export default Favorites;
