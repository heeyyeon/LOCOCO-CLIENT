export const ID_ERROR_MESSAGE_KEYS = {
  POSITIVE: 'idAvailable',
  NEGATIVE: 'idTaken',
} as const;

export const PROFILE_TEXT_ERROR_MESSAGE_KEYS = {
  ID: 'idRequired',
  BIRTH: {
    YEAR: 'yearRequired',
    MONTH: 'monthRequired',
    DATE: 'dateRequired',
  },
  GENDER: 'genderRequired',
  FIRST_NAME: 'firstNameRequired',
  LAST_NAME: 'lastNameRequired',
  EMAIL: 'emailRequired',
  PHONE: {
    COUNTRY_CODE: 'countryCodeRequired',
    PHONE_NUMBER: 'phoneNumberRequired',
  },
  COUNTRY: 'countryRequired',
  STATE: 'stateRequired',
  CITY: 'cityRequired',
  ADDRESS_LINE_1: 'addressLine1Required',
  ADDRESS_LINE_2: 'addressLine2Required',
  ZIP: 'zipRequired',
  CONTENT_LANGUAGE: 'contentLanguageRequired',
  SKIN_TYPE: 'skinTypeRequired',
  SKIN_TONE: 'skinToneRequired',
  PROFILE_IMAGE: 'profileImageRequired',
} as const;
