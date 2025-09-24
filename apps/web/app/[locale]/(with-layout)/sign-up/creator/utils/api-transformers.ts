import {
  type CreatorInfoResponse,
  type CreatorRegisterRequest,
} from '../types/creator-form';
import { type CreatorSignupForm } from './signup';

/**
 * API 응답 데이터를 폼 데이터 형식으로 변환
 */
export const transformApiToForm = (
  apiData: CreatorInfoResponse['data']
): CreatorSignupForm => {
  const [birthYear, birthMonth, birthDay] = apiData.birthDate.split('-');

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

    ...apiData,
  };
};

/**
 * 폼 데이터를 API 요청 형식으로 변환
 */
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

    ...formData,
  };
};
