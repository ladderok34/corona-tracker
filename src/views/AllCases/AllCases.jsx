import React, { useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
    getIsCasesLoaded,
    getIsCasesError,
    getTotalCases,
} from 'selectors/cases';
import { fetchCases } from 'actions/cases';
import { useActions } from 'reduxHooks/useActions';
import DefaultHeader from 'components/DefaultHeader/DefaultHeader';
import Container from 'components/Container/Container';
import List from './List/List';

const AllCases = () => {
    const fetchCasesDispatch = useActions(fetchCases);

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
                <List cases={totalCases} />
            )}
        </Container>
    );
};

AllCases.displayName = 'AllCases';
export default AllCases;
