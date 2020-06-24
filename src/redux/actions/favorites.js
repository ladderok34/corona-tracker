import {
    SET_FAVORITES_COUNTRY_NAMES,
    SET_FAVORITES_COUNTRIES_DATA,
    SET_FAVORITES_LOADED,
} from '../types/favorites';
import AsyncStorage from '@react-native-community/async-storage';
import api from 'api/api';

const storageKeyName = 'CORONA_TRACKER_FAVORITES';

export const setFavoritesLoaded = (isLoaded) => dispatch => dispatch({ type: SET_FAVORITES_LOADED, payload: isLoaded });
const setFavoritesCountryNames = (data) => dispatch => dispatch({ type: SET_FAVORITES_COUNTRY_NAMES, payload: data });
export const setFavoritesCountriesData = (data) => dispatch => dispatch({ type: SET_FAVORITES_COUNTRIES_DATA, payload: data });

const getFavoritesCountryNamesFromStorage = async () => {
    try {
        let favoritesList = await AsyncStorage.getItem(storageKeyName);
        if (favoritesList === null) {
            return [];
        }

        return JSON.parse(favoritesList);
    } catch (e) {
        console.error('Failed to get favorites country names', e);
    }
};

export const fetchFavoritesCountryNames = () => async dispatch => {
    try {
        const favoritesList = await getFavoritesCountryNamesFromStorage();
        dispatch(setFavoritesCountryNames(favoritesList));
    } catch (e) {
        console.error('Failed to get favorites country names', e);
    }
};

export const fetchFavoritesCountriesData = (countryNames) => async dispatch => {
    let promises = [];
    dispatch(setFavoritesLoaded(false));

    countryNames.forEach((country) => {
        promises = [...promises, api.getCountry(country.code)];
    });

    Promise.all(promises).then((data) => {
        let countriesData = [];
        data.forEach((country) => {
            const lastDayData = country.data[country.data.length - 1];
            countriesData = [...countriesData, lastDayData];
        });

        dispatch(setFavoritesCountriesData(countriesData));
        dispatch(setFavoritesLoaded(true));
    });
};

export const addToFavorites = (name, code) => async dispatch => {
    try {
        const favoritesList = await AsyncStorage.getItem(storageKeyName);
        let updatedFavoritesList = [];

        if (!!favoritesList === true) {
            const parsedFavoritesList = JSON.parse(favoritesList);
            updatedFavoritesList = [...parsedFavoritesList, { name, code }];
        } else {
            updatedFavoritesList = [{ name, code }];
        }

        const updatedFavoritesListJson = JSON.stringify(updatedFavoritesList);
        await AsyncStorage.removeItem(storageKeyName);
        await AsyncStorage.setItem(storageKeyName, updatedFavoritesListJson);

        dispatch(setFavoritesCountryNames(updatedFavoritesList));
    } catch (e) {
        console.error('Failed to add country name to favorites country names', e);
    };
};

export const removeFromFavorites = (code) => async dispatch => {
    try {
        const favoritesList = await AsyncStorage.getItem(storageKeyName);
        const parsedFavoritesList = JSON.parse(favoritesList);

        if (!!parsedFavoritesList === false) {
            return;
        }

        const filteredFavoritesList = parsedFavoritesList.filter(country => country.code !== code);

        if (filteredFavoritesList.length > 0) {
            const filteredFavoritesListJson = JSON.stringify(filteredFavoritesList);
            await AsyncStorage.removeItem(storageKeyName);
            await AsyncStorage.setItem(storageKeyName, filteredFavoritesListJson);
        } else {
            await AsyncStorage.removeItem(storageKeyName);
        }

        dispatch(setFavoritesCountryNames(filteredFavoritesList));
    } catch (e) {
        console.error('Failed to remove country name from favorites country names', e);
    }
};
