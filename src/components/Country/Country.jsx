import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { getShowSpinner, getCountry, getFailedLoading } from 'selectors/country';
import { fetchCountryInfo, unsetCountryInfo } from 'actions/country';
import { useActions } from 'reduxHooks/useActions';
import { useRoute } from '@react-navigation/native';
import CountryPresentational from './Country.presentational';
import Container from '../Container/Container';

const Country = () => {
    const route = useRoute();
    const { countryCode } = route.params;
    const [fetchCountryInfoDispatch, unsetCountryInfoDispatch] = useActions([fetchCountryInfo, unsetCountryInfo]);

    const {
        data,
        showSpinner,
        failedLoading,
    } = useSelector(state => ({
        data: getCountry(state),
        showSpinner: getShowSpinner(state),
        failedLoading: getFailedLoading(state),
    }), shallowEqual);

    useEffect(() => {
        fetchCountryInfoDispatch(countryCode);
        return () => {
            unsetCountryInfoDispatch();
        };
    }, []);

    return (
        <Container
            showSpinner={showSpinner}
            failedLoading={failedLoading}
            refetch={() => { fetchCountryInfoDispatch(countryCode); }}
        >
            {data.length > 0 && (
                <CountryPresentational data={data} countryCode={countryCode} />
            )}
        </Container>
    );
};

Country.displayName = "Country";
export default Country;
