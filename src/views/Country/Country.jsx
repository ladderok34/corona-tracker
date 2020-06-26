import React, {
    useEffect,
    useCallback,
    useMemo,
} from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { fetchFavorites, addToFavorites, removeFromFavorites } from 'actions/favorites';
import { getFavorites } from 'selectors/favorites';
import { getCountry } from 'selectors/country';
import { setCountry, fetchCountry } from 'actions/country';
import { useActions } from 'reduxHooks/useActions';
import { useRoute, useNavigation } from '@react-navigation/native';
import Container from 'components/Container/Container';
import Header from './components/Header/Header';
import api from 'api/api';
import Tabs from './components/Tabs/Tabs';
import { setDateRequestParams } from './Country.utils';

const Country = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [
        fetchFavoritesDispatch,
        addToFavoritesDispatch,
        removeFromFavoritesDispatch,
        setCountryDispatch,
        fetchCountryDispatch,
    ] = useActions([
        fetchFavorites,
        addToFavorites,
        removeFromFavorites,
        setCountry,
        fetchCountry,
    ]);

    const {
        favorites,
        country,
    } = useSelector(state => ({
        favorites: getFavorites(state),
        country: getCountry(state),
    }), shallowEqual);

    useEffect(() => {
        fetchFavoritesDispatch();
        setCountryDispatch(route.params.country);
    }, []);

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
    }, [inFavorites, country]);

    const onTabChange = useCallback((heading) => {
        if (heading === 'Total') {
            setCountryDispatch(route.params.country);
        } else {
            const dateParams = setDateRequestParams();
            fetchCountryDispatch(country.countryCode, dateParams, country, heading);
        }
    }, [country]);

    // Todo: Add loading spinner
    if (!Object.keys(country).length) {
        return null;
    }

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
            tabs={(
                <Tabs
                    data={country}
                    onTabChange={onTabChange}
                />
            )}
        />
    );
};

Country.displayName = "Country";
export default Country;
