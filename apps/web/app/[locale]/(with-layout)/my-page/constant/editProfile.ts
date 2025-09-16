export const ID_ERROR_MESSAGE = {
  POSITIVE: 'Great! This ID is available.',
  NEGATIVE: 'This ID is already taken.',
} as const;

export const PROFILE_TEXT_ERROR_MESSAGE = {
  ID: 'ID is required',
  BIRTH: {
    YEAR: 'Year is required',
    MONTH: 'Month is required',
    DATE: 'Date is required',
  },
  GENDER: 'Gender is required',
  FIRST_NAME: 'First name is required',
  LAST_NAME: 'Last name is required',
  EMAIL: 'Email is required',
  PHONE: {
    COUNTRY_CODE: 'Country code is required',
    PHONE_NUMBER: 'Phone number is required',
  },
  COUNTRY: 'Country is required',
  STATE: 'State is required',
  CITY: 'City is required',
  ADDRESS_LINE_1: 'Address line 1 is required',
  ADDRESS_LINE_2: 'Address line 2 is required',
  ZIP: 'Zip is required',
  CONTENT_LANGUAGE: 'Content language is required',
  SKIN_TYPE: 'Skin type is required',
  SKIN_TONE: 'Skin tone is required',
} as const;
