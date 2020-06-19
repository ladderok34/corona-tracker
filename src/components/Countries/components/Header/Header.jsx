import React, { useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { setCountrySearchQuery, setCountrySortingOption } from 'actions/cases';
import { getCountrySearchQuery, getCountrySortingOption } from 'selectors/cases';
import { useActions } from 'reduxHooks/useActions';
import HeaderPresentational from './Header.presentational';

const Header = () => {
    const {
        searchQuery,
        sortingOption,
    } = useSelector(state => ({
        searchQuery: getCountrySearchQuery(state),
        sortingOption: getCountrySortingOption(state),
    }), shallowEqual);
    const [
        setCountrySearchQueryDispatch,
        setCountrySortingOptionDispatch,
    ] = useActions([setCountrySearchQuery, setCountrySortingOption]);

    const handleSearch = useCallback((event) => {
        setCountrySearchQueryDispatch(event.nativeEvent.text);
    }, [searchQuery]);

    const handleSorting = useCallback((option) => {
        setCountrySortingOptionDispatch(option);
    }, [sortingOption]);

    return (
        <HeaderPresentational
            searchQuery={searchQuery}
            sortingOption={sortingOption}
            onSearchChange={handleSearch}
            onSortingChange={handleSorting}
        />
    );
};

Header.displayName = 'Header';
export default React.memo(Header);
