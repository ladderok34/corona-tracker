export const getFavoritesCountriesExtendedInfo = (favorites, countries) =>
  favorites.reduce((accumulator, code) => {
    const favoritesCountry = countries.find((country) => code === country.CountryCode)

    if (!!favoritesCountry !== false) {
      const remappedCountry = {
        countryName: favoritesCountry.Country,
        countryCode: favoritesCountry.CountryCode,
        confirmed: favoritesCountry.TotalConfirmed,
        deaths: favoritesCountry.TotalDeaths,
        recovered: favoritesCountry.TotalRecovered,
      }

      accumulator.push(remappedCountry)
    }

    return accumulator
  }, [])
