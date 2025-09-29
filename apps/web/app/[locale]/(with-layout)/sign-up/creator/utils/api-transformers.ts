import {
  type CreatorInfoResponse,
  type CreatorRegisterRequest,
} from '../types/creator-form';
import { type CreatorSignupForm } from './signup';

export const transformApiToForm = (
  apiData: CreatorInfoResponse['data']
): CreatorSignupForm => {
  const [birthYear, birthMonth, birthDay] = apiData.birthDate?.split('-') || [
    '',
    '',
    '',
  ];

  return {
    id: apiData.creatorName,
    birthYear: birthYear || '',
    birthMonth: birthMonth || '',
    birthDay: birthDay || '',
    phoneCountryCode: apiData.countryCode,
    stateRegion: apiData.stateOrProvince,
    city: apiData.cityOrTown,
    addressLine2: apiData.addressLine2 || '',
    zipCode: apiData.postalCode || '',
    gender: apiData.gender || '',
    firstName: apiData.firstName || '',
    lastName: apiData.lastName || '',
    phoneNumber: apiData.phoneNumber || '',
    contentLanguage: apiData.contentLanguage || '',
    country: apiData.country || '',
    addressLine1: apiData.addressLine1 || '',
    skinType: apiData.skinType || '',
    skinTone: apiData.skinTone || '',
  };
};

export const transformFormToApi = (
  formData: CreatorSignupForm
): CreatorRegisterRequest => {
  return {
    creatorName: formData.id,
    birthDate: `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`,
    countryCode: formData.phoneCountryCode,
    stateOrProvince: formData.stateRegion,
    cityOrTown: formData.city,
    addressLine2: formData.addressLine2 || null,
    postalCode: formData.zipCode || null,
    gender: formData.gender,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phoneNumber: formData.phoneNumber,
    contentLanguage: formData.contentLanguage,
    country: formData.country,
    addressLine1: formData.addressLine1,
    skinType: formData.skinType,
    skinTone: formData.skinTone,
  };
};
