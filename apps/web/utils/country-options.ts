import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import es from 'i18n-iso-countries/langs/es.json';
import ko from 'i18n-iso-countries/langs/ko.json';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

[en, es, ko].forEach((locale) => countries.registerLocale(locale));

const convertToCountryName = (countryCode: string, locale: string = 'en') => {
  try {
    const countryName = countries.getName(countryCode, locale);
    return countryName || countryCode;
  } catch {
    return countryCode;
  }
};

export const countryNameOptions = (locale: string = 'en') => {
  const countryCodes = getCountries();
  return countryCodes.map((countryCode) => ({
    label: convertToCountryName(countryCode, locale),
    value: countryCode,
  }));
};

export const countryPhoneCodeOptions = () => {
  const countries = getCountries();
  const uniqueCallingCodes = new Set();

  return countries
    .map((countryCode) => ({
      countryCode,
      callingCode: getCountryCallingCode(countryCode),
      label: `+${getCountryCallingCode(countryCode)}`,
      value: `+${getCountryCallingCode(countryCode)}`,
    }))
    .filter((item) => {
      if (uniqueCallingCodes.has(item.callingCode)) {
        return false;
      }
      uniqueCallingCodes.add(item.callingCode);
      return true;
    })
    .sort((a, b) => parseInt(a.callingCode) - parseInt(b.callingCode));
};
