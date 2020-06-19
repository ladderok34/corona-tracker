export const findCountriesByName = (query, countries) => {
    let list = [];

    countries.forEach((country) => {
        if (country.Country.toLowerCase().includes(query.toLowerCase())) {
            list = [...list, country];
        }
    });

    return list;
};

export const sortCountries = (countries, sortingOption) => countries.sort((a, b) => {
    if (sortingOption === 'total') {
        return b.TotalConfirmed - a.TotalConfirmed;
    }

    if (sortingOption === 'deaths') {
        return b.TotalDeaths - a.TotalDeaths;
    }

    if (sortingOption === 'recoveries') {
        return b.TotalRecovered - a.TotalRecovered;
    }

    if (sortingOption === 'remaining') {
        const aRemaining = a.TotalConfirmed - a.TotalRecovered - a.TotalDeaths;
        const bRemaining = b.TotalConfirmed - b.TotalRecovered - b.TotalDeaths;

        return bRemaining - aRemaining;
    }
});
