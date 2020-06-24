import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { getShowSpinner, getCountry, getFailedLoading } from 'selectors/country';
import { fetchCountryInfo, unsetCountryInfo } from 'actions/country';
import { addToFavorites, removeFromFavorites } from 'actions/favorites';
import { getFavoritesCountryNames } from 'selectors/favorites';
import { useActions } from 'reduxHooks/useActions';
import { useRoute } from '@react-navigation/native';
import CountryPresentational from './Country.presentational';

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
        showSpinner,
        failedLoading,
        favorites,
    } = useSelector(state => ({
        data: getCountry(state),
        showSpinner: getShowSpinner(state),
        failedLoading: getFailedLoading(state),
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
        <>
            {data.length > 0 && (
                <CountryPresentational
                    data={data}
                    code={code}
                    favoritesOnPress={toggleFavorites}
                    inFavorites={inFavorites}
                />
            )}
        </>
    );
};

Country.displayName = "Country";
export default Country;
