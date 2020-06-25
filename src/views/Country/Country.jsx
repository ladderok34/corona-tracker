import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { fetchCountryInfo, unsetCountryInfo } from 'actions/country';
import { fetchFavorites, addToFavorites, removeFromFavorites } from 'actions/favorites';
import { getFavorites } from 'selectors/favorites';
import { useActions } from 'reduxHooks/useActions';
import { useRoute, useNavigation } from '@react-navigation/native';
import Container from 'components/Container/Container';
import Header from './components/Header/Header';
import Tabs from './components/Tabs/Tabs';

const Country = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const { country } = route.params;
    const [
        fetchCountryInfoDispatch,
        unsetCountryInfoDispatch,
        fetchFavoritesDispatch,
        addToFavoritesDispatch,
        removeFromFavoritesDispatch,
    ] = useActions([
        fetchCountryInfo,
        unsetCountryInfo,
        fetchFavorites,
        addToFavorites,
        removeFromFavorites,
    ]);

    useEffect(() => {
        fetchFavoritesDispatch();
    }, []);

    const {
        favorites,
    } = useSelector(state => ({
        favorites: getFavorites(state),
    }), shallowEqual);

    const inFavorites = useMemo(() => favorites.includes(country.countryCode), [favorites]);

    const goBack = useCallback(() => {
        navigation.goBack();
    }, []);

    const toggleFavorites = useCallback(() => {
        if (inFavorites) {
            removeFromFavoritesDispatch(country.countryCode);
        } else {
            addToFavoritesDispatch(country.countryCode);
        }
    }, [inFavorites]);

    console.log('sasaka');

    return (
        <Container
            header={(
                <Header
                    countryName={country.countryName}
                    countryCode={country.countryCode}
                    inFavorites={inFavorites}
                    goBack={goBack}
                    favoritesOnPress={toggleFavorites}
                />
            )}
            tabs={<Tabs data={country} />}
        />
    );
};

Country.displayName = "Country";
export default Country;
