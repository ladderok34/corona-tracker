export const findCountriesByName = (query, countries) => {
    let list = [];

    countries.forEach((country) => {
        if (country.Country.toLowerCase().includes(query.toLowerCase())) {
            list = [...list, country];
        }
    });

    return list;
};

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
        return b.TotalRecovered - a.TotalRecovered;
    }

    if (sortingOption === 'remaining') {
        const aRemaining = a.TotalConfirmed - a.TotalRecovered - a.TotalDeaths;
        const bRemaining = b.TotalConfirmed - b.TotalRecovered - b.TotalDeaths;

        return sorting === 'desc' ? bRemaining - aRemaining : aRemaining - bRemaining;
    }
});
