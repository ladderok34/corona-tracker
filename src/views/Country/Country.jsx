import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { getIsCountryLoaded, getCountry, getIsCountryError } from 'selectors/country';
import { fetchCountryInfo, unsetCountryInfo } from 'actions/country';
import { addToFavorites, removeFromFavorites } from 'actions/favorites';
import { getFavoritesCountryNames } from 'selectors/favorites';
import { useActions } from 'reduxHooks/useActions';
import { useRoute } from '@react-navigation/native';
import CountryPresentational from './Country.presentational';
import Container from 'components/Container/Container';

const Country = () => {
    const route = useRoute();
    const { name, code } = route.params;
    const [
        fetchCountryInfoDispatch,
        unsetCountryInfoDispatch,
        addToFavoritesDispatch,
        removeFromFavoritesDispatch,
    ] = useActions([
        fetchCountryInfo,
        unsetCountryInfo,
        addToFavorites,
        removeFromFavorites,
    ]);

    const {
        data,
        isLoaded,
        isError,
        favorites,
    } = useSelector(state => ({
        data: getCountry(state),
        isLoaded: getIsCountryLoaded(state),
        isError: getIsCountryError(state),
        favorites: getFavoritesCountryNames(state),
    }), shallowEqual);

    useEffect(() => {
        fetchCountryInfoDispatch(code);
        return () => {
            unsetCountryInfoDispatch();
        };
    }, []);

    const inFavorites = useMemo(() => favorites.find(country => country.code === code), [favorites]);

    const toggleFavorites = useCallback(() => {
        if (inFavorites) {
            removeFromFavoritesDispatch(code);
        } else {
            addToFavoritesDispatch(name, code);
        }
    }, [inFavorites]);

    return (
        <Container
            isError={isError}
            refetch={fetchCountryInfoDispatch}
            isLaoded={isLoaded}
            centered={isError || !isLoaded}
        >
            {data.length > 0 && (
                <CountryPresentational
                    data={data}
                    code={code}
                    favoritesOnPress={toggleFavorites}
                    inFavorites={inFavorites}
                />
            )}
        </Container>
    );
};

Country.displayName = "Country";
export default Country;
