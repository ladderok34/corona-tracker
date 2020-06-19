import React, { useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { setCountrySearchQuery, setCountrySortingOption } from 'actions/cases';
import { getCountrySearchQuery, getCountrySortingOption } from 'selectors/cases';
import { useActions } from 'reduxHooks/useActions';
import LayoutHeaderPresentational from './LayoutHeader.presentational';

const LayoutHeader = () => {
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
        <LayoutHeaderPresentational
            searchQuery={searchQuery}
            sortingOption={sortingOption}
            onSearchChange={handleSearch}
            onSortingChange={handleSorting}
        />
    );
};

LayoutHeader.displayName = 'LayoutHeader';
export default React.memo(LayoutHeader);
