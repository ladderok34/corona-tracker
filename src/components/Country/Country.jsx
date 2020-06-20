import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { getShowSpinner, getCountry, getFailedLoading } from 'selectors/country';
import { fetchCountryInfo, unsetCountryInfo } from 'actions/country';
import { useActions } from 'reduxHooks/useActions';
import { useRoute } from '@react-navigation/native';
import { Container, Content } from 'native-base';
import { ActivityIndicator } from 'react-native';
import LoadingFailed from 'components/LoadingFailed/LoadingFailed';
import CountryPresentational from './Country.presentational';

const contentContainerStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' };

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
        <Container>
            <Content
                contentContainerStyle={(failedLoading || showSpinner) ? contentContainerStyle : {}}
            >
                {failedLoading && <LoadingFailed refetch={fetchSummaryDispatch(countryCode)} />}
                {showSpinner && <ActivityIndicator size="large" />}
                {data.length > 0 && (
                    <CountryPresentational data={data} countryCode={countryCode} />
                )}
            </Content>
        </Container>
    );
};

Country.displayName = "Country";
export default React.memo(Country);
