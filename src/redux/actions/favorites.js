import { SET_FAVORITES } from '../types/favorites'
import AsyncStorage from '@react-native-community/async-storage'

const storageKeyName = 'CORONA_TRACKER_FAVORITES'

const setFavorites = (data) => (dispatch) => dispatch({ type: SET_FAVORITES, payload: data })

const getFavoritesFromStorage = async () => {
  await AsyncStorage.getItem(storageKeyName)
  try {
    let favoritesList = await AsyncStorage.getItem(storageKeyName)
    if (favoritesList === null) {
      return []
    }

    return JSON.parse(favoritesList)
  } catch (e) {
    console.error('Failed to get favorites', e)
  }
}

export const fetchFavorites = () => async (dispatch) => {
  try {
    const favoritesList = await getFavoritesFromStorage()
    dispatch(setFavorites(favoritesList))
  } catch (e) {
    console.error('Failed to get favorites', e)
  }
}

export const addToFavorites = (code) => async (dispatch) => {
  try {
    const favoritesList = await AsyncStorage.getItem(storageKeyName)
    let updatedFavoritesList = []

    if (!!favoritesList === true) {
      const parsedFavoritesList = JSON.parse(favoritesList)
      const filteredFavoritesList = parsedFavoritesList.filter((item) => item !== code)

      updatedFavoritesList = [...filteredFavoritesList, code]
    } else {
      updatedFavoritesList = [code]
    }

    const updatedFavoritesListJson = JSON.stringify(updatedFavoritesList)
    await AsyncStorage.removeItem(storageKeyName)
    await AsyncStorage.setItem(storageKeyName, updatedFavoritesListJson)

    dispatch(setFavorites(updatedFavoritesList))
  } catch (e) {
    console.error('Failed to add country code to favorites country codes', e)
  }
}

export const removeFromFavorites = (code) => async (dispatch) => {
  try {
    const favoritesList = await AsyncStorage.getItem(storageKeyName)
    const parsedFavoritesList = JSON.parse(favoritesList)

    if (!!parsedFavoritesList === false) {
      return
    }

    const filteredFavoritesList = parsedFavoritesList.filter((item) => item !== code)

    if (filteredFavoritesList.length > 0) {
      const filteredFavoritesListJson = JSON.stringify(filteredFavoritesList)
      await AsyncStorage.removeItem(storageKeyName)
      await AsyncStorage.setItem(storageKeyName, filteredFavoritesListJson)
    } else {
      await AsyncStorage.removeItem(storageKeyName)
    }

    dispatch(setFavorites(filteredFavoritesList))
  } catch (e) {
    console.error('Failed to remove country code from favorites country codes', e)
  }
}
