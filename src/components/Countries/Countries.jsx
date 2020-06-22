import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo,
} from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getSearchQuery, getSortingOption } from 'selectors/countriesOptions';
import { getCountriesCases } from 'selectors/cases';
import { useActions } from 'reduxHooks/useActions';
import { resetSearch } from 'actions/countriesOptions';
import List from './components/List/List';
import { findCountriesByName, sortCountries } from './Countries.utils';
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
        const countriesList = sortedCountries.slice(0, sliceTo);
        setCountriesToRender(countriesList);
    }, [currentScrollChunk, sortedCountries]);

    const handleEndOnReached = useCallback(() => {
        const newCurrentChunk = currentScrollChunk + 1;
        if (newCurrentChunk <= maxAmountOfChunks) {
            setCurrentScrollChunk(newCurrentChunk);
        }
    }, [currentScrollChunk, maxAmountOfChunks]);

    const navigateToCountry = useCallback((name, code) => {
        navigation.navigate('Country', { name, code });
    }, []);

    return (
        <SafeAreaView>
            <Header />
            {searchQuery.length > 0 && !sortedCountries.length && (
                <NoResults
                    searchQuery={searchQuery}
                    resetSearch={resetSearchDispatch}
                />
            )}
            {countriesToRender.length > 0 && (
                <List
                    countries={countriesToRender}
                    navigateToCountry={navigateToCountry}
                    handleEndOnReached={handleEndOnReached}
                />
            )}
        </SafeAreaView>
    );
};

Countries.displayName = 'Countries';
export default Countries;
