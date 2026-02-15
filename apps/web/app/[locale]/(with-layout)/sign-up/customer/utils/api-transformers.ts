import {
  type CustomerInfoResponse,
  type CustomerRegisterRequest,
} from '../types/customer-form';
import { type CustomerSignupForm } from './signup';

export const transformApiToForm = (
  apiData: CustomerInfoResponse['data']
): CustomerSignupForm => {
  const [birthYear, birthMonth, birthDay] = apiData.birthDate?.split('-') || [
    '',
    '',
    '',
  ];

  return {
    id: apiData.userName || '',
    birthYear: birthYear || '',
    birthMonth: birthMonth || '',
    birthDay: birthDay || '',
    phoneCountryCode: apiData.countryCode || '',
    gender: apiData.gender || '',
    firstName: apiData.firstName || '',
    lastName: apiData.lastName || '',
    phoneNumber: apiData.phoneNumber || '',
    country: apiData.country || '',
    skinType: apiData.skinType || '',
    skinTone: apiData.skinTone || '',
  };
};

export const transformFormToApi = (
  formData: CustomerSignupForm
): CustomerRegisterRequest => {
  return {
    customerName: formData.id,
    birthDate: `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`,
    countryCode: formData.phoneCountryCode || undefined,
    gender: formData.gender,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phoneNumber: formData.phoneNumber || undefined,
    country: formData.country,
    skinType: formData.skinType,
    skinTone: formData.skinTone,
  };
};
