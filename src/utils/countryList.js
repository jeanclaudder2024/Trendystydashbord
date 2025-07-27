import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export const getCountryOptions = () => {
  const countryCodes = countries.getAlpha2Codes();
  const countryNames = countries.getNames('en');

  return Object.keys(countryCodes).map((code) => ({
    code,
    name: countryNames[code]
  }));
};
