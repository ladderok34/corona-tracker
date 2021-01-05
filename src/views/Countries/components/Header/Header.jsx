import React, { useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { setSearchQuery, setSortingOption } from 'actions/countriesOptions'
import { getSearchQuery, getSortingOption } from 'selectors/countriesOptions'
import { useActions } from 'reduxHooks/useActions'
import HeaderPresentational from './Header.presentational'

const Header = () => {
  const { searchQuery, sortingOption } = useSelector(
    (state) => ({
      searchQuery: getSearchQuery(state),
      sortingOption: getSortingOption(state),
    }),
    shallowEqual
  )
  const [setSearchQueryDispatch, setSortingOptionDispatch] = useActions([setSearchQuery, setSortingOption])

  const handleSearch = useCallback(
    (event) => {
      setSearchQueryDispatch(event.nativeEvent.text)
    },
    [searchQuery]
  )

  const handleSorting = useCallback(
    (option) => {
      setSortingOptionDispatch(option)
    },
    [sortingOption]
  )

  return <HeaderPresentational searchQuery={searchQuery} sortingOption={sortingOption} onSearchChange={handleSearch} onSortingChange={handleSorting} />
}

Header.displayName = 'Header'
export default Header
