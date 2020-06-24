import React, { useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    getIsCasesLoaded,
    getIsCasesError,
    getTotalCases,
} from 'selectors/cases';
import { fetchCases } from 'actions/cases';
import { fetchFavoritesCountryNames } from 'actions/favorites';
import { useActions } from 'reduxHooks/useActions';
import DefaultHeader from 'components/DefaultHeader/DefaultHeader';
import Container from 'components/Container/Container';
import List from './components/List/List';

const AllCases = () => {
    const navigation = useNavigation();
    const [
        fetchCasesDispatch,
        fetchFavoritesCountryNamesDispatch,
    ] = useActions([
        fetchCases,
        fetchFavoritesCountryNames,
    ]);

    const {
        isError,
        isLoaded,
        totalCases,
    } = useSelector(state => ({
        isError: getIsCasesError(state),
        isLoaded: getIsCasesLoaded(state),
        totalCases: getTotalCases(state),
    }), shallowEqual);

    useEffect(() => {
        fetchCasesDispatch();
        fetchFavoritesCountryNamesDispatch();
    }, []);

    const navigateToCase = useCallback((name) => {
        navigation.navigate('Case', { name });
    }, []);

    return (
        <Container
            isLoaded={isLoaded}
            isError={isError}
            refetch={fetchCasesDispatch}
            header={<DefaultHeader title="All cases" />}
            centered={isError || !isLoaded}
        >
            {Object.keys(totalCases).length > 0 && (
                <List
                    cases={totalCases}
                    navigateToCase={navigateToCase}
                />
            )}
        </Container>
    );
};

AllCases.displayName = 'AllCases';
export default AllCases;
