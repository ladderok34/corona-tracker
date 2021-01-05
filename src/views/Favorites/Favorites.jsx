import React, { useEffect, useCallback, useRef } from 'react'
import isEqual from 'lodash/isEqual'
import { useActions } from 'reduxHooks/useActions'
import { useSelector, shallowEqual } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import DefaultHeader from 'components/DefaultHeader/DefaultHeader'
import { getFavorites } from 'selectors/favorites'
import { fetchFavorites } from 'actions/favorites'
import { getCountriesCases } from 'selectors/cases'
import CountriesList from 'components/CountriesList/CountriesList'
import Container from 'components/Container/Container'
import Empty from './components/Empty/Empty'
import { getFavoritesCountriesExtendedInfo } from './Favorites.utils'

const Favorites = () => {
  const navigation = useNavigation()
  const fetchFavoritesDispatch = useActions(fetchFavorites)

  const { favorites, countries } = useSelector(
    (state) => ({
      favorites: getFavorites(state),
      countries: getCountriesCases(state),
    }),
    shallowEqual
  )

  useEffect(() => {
    fetchFavoritesDispatch()
  }, [])

  const navigateToCountry = useCallback((country) => {
    navigation.navigate('Country', { country })
  }, [])

  return (
    <Container header={<DefaultHeader title="Favorites" />} centered={!favorites.length}>
      {favorites.length > 0 && countries.length > 0 ? (
        <CountriesList data={getFavoritesCountriesExtendedInfo(favorites, countries)} listItemOnPress={navigateToCountry} />
      ) : (
        <Empty />
      )}
    </Container>
  )
}

export default Favorites
