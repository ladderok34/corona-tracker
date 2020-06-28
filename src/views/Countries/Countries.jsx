import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo,
} from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useActions } from 'reduxHooks/useActions';
import { getSearchQuery, getSortingOption } from 'selectors/countriesOptions';
import { getCountriesCases } from 'selectors/cases';
import { resetSearch } from 'actions/countriesOptions';
import CountriesList from 'components/CountriesList/CountriesList';
import Container from 'components/Container/Container';
import { findCountriesByName, sortCountries, remapCountries } from './Countries.utils';
import Header from './components/Header/Header';
import NoResults from './components/NoResults/NoResults';

const countriesToRenderPerScroll = 50;

const Countries = () => {
    const navigation = useNavigation();
    const [sortedCountries, setSortedCountries] = useState([]);
    const [currentScrollChunk, setCurrentScrollChunk] = useState(1);
    const [countriesToRender, setCountriesToRender] = useState([]);
    const firstSortedCountriesRerender = useRef(true);
    const resetSearchDispatch = useActions(resetSearch);

    const {
        countries,
        searchQuery,
        sortingOption,
    } = useSelector(state => ({
        countries: getCountriesCases(state),
        searchQuery: getSearchQuery(state),
        sortingOption: getSortingOption(state),
    }), shallowEqual);

    const maxAmountOfChunks = useMemo(() => Math.ceil(countries.length / countriesToRenderPerScroll), [countries]);

    useEffect(() => {
        if (countries.length > 0) {
            let list = [];

            if (searchQuery.length > 1) {
                list = findCountriesByName(searchQuery, countries);
            } else {
                list = [...countries];
            }

            list = sortCountries(list, sortingOption);
            setSortedCountries(list);
        }
    }, [searchQuery, sortingOption, countries]);

    useEffect(() => {
        if (!sortedCountries.length) {
            return;
        }

        if (firstSortedCountriesRerender.current) {
            firstSortedCountriesRerender.current = false;
            return;
        }
        setCurrentScrollChunk(1);
    }, [sortedCountries]);

    useEffect(() => {
        const sliceTo =  currentScrollChunk * countriesToRenderPerScroll;
        const slicedCountries = sortedCountries.slice(0, sliceTo);
        setCountriesToRender(slicedCountries);
    }, [currentScrollChunk, sortedCountries]);

    const handleEndOnReached = useCallback(() => {
        const newCurrentChunk = currentScrollChunk + 1;
        if (newCurrentChunk <= maxAmountOfChunks) {
            setCurrentScrollChunk(newCurrentChunk);
        }
    }, [currentScrollChunk, maxAmountOfChunks]);

    const navigateToCountry = useCallback((country) => {
        navigation.navigate('Country', { country });
    }, []);

    return (
        <Container
            header={<Header />}
            centered={searchQuery.length > 0 && !sortedCountries.length}
        >
            <>
                {(searchQuery.length > 0 && !sortedCountries.length) ? (
                    <NoResults
                        searchQuery={searchQuery}
                        resetSearch={resetSearchDispatch}
                    />
                ) : null}
                {countriesToRender.length > 0 && (
                    <CountriesList
                        data={remapCountries(countriesToRender)}
                        listItemOnPress={navigateToCountry}
                        handleEndOnReached={handleEndOnReached}
                    />
                )}
            </>
        </Container>
    );
};

Countries.displayName = 'Countries';
export default Countries;