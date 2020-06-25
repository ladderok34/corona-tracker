export const findCountriesByName = (query, countries) => countries.filter((country) => {
    if (!country.Country.toLowerCase().includes(query.toLowerCase())) {
        return;
    }

    return country;
});

export const sortCountries = (countries, sorting) => countries.sort((a, b) => {
    const [sortingOption, direction] = sorting.split(' ');

    if (sortingOption === 'total') {
        return direction === 'desc' ? b.TotalConfirmed - a.TotalConfirmed : a.TotalConfirmed - b.TotalConfirmed;
    }

    if (sortingOption === 'deaths') {
        return direction === 'desc' ? b.TotalDeaths - a.TotalDeaths : a.TotalDeaths - b.TotalDeaths;
    }

    if (sortingOption === 'recoveries') {
        return direction === 'desc' ? b.TotalRecovered - a.TotalRecovered : a.TotalRecovered - b.TotalRecovered;
    }

    if (sortingOption === 'remaining') {
        const aRemaining = a.TotalConfirmed - (a.TotalRecovered + a.TotalDeaths);
        const bRemaining = b.TotalConfirmed - (b.TotalRecovered + b.TotalDeaths);

        return direction === 'desc' ? bRemaining - aRemaining : aRemaining - bRemaining;
    }
});

export const remapCountries = data => data.map(country => ({
    countryName: country.Country,
    countryCode: country.CountryCode,
    confirmed: country.TotalConfirmed,
    deaths: country.TotalDeaths,
    recovered: country.TotalRecovered,
}));
