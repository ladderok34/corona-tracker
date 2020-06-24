export const remapCountries = (data, countryNames) => data.map((country) => {
    let currentCountryNames = countryNames.find(item => item.name === country.Country);

    if (!!currentCountryNames === false) {
        // only issue with on dev coz of mocked api data.
        currentCountryNames = { code: 'DK', name: 'Denmark' };
    }

    return {
        countryName: country.Country,
        countryCode: currentCountryNames.code,
        confirmed: country.Confirmed,
        deaths: country.Deaths,
        recovered: country.Recovered,
    };
});
