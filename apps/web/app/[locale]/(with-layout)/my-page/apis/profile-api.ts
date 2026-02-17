'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';

import type {
  ApiResponseCreatorMyPageResponse,
  ApiResponseCustomerMyPageResponse,
  ApiResponseVoid,
  CreatorMyPageResponse,
  CreatorMyPageUpdateRequest,
  CustomerMyPageRequest,
} from '../../../../../swagger-codegen/data-contracts';
import type { CreatorSignupForm } from '../../sign-up/creator/utils/signup';
import type { CustomerSignupForm } from '../../sign-up/customer/utils/signup';
import { PROFILE_KEYS } from '../constant/queryKey';
import { getMyPageUserRoleOrThrow } from './user-role';

interface MyPageProfileForm {
  id?: string;
  birthMonth?: string;
  birthDay?: string;
  birthYear?: string;
  gender?: string;
  firstName?: string;
  lastName?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  contentLanguage?: string;
  country?: string;
  stateRegion?: string;
  city?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  zipCode?: string;
  skinType?: string;
  skinTone?: string;
}

const GENDER_VALUES = [
  'MALE',
  'FEMALE',
  'NON_BINARY',
  'PREFER_NOT_TO_SAY',
] as const;
const CONTENT_LANGUAGE_VALUES = [
  'ENGLISH',
  'SPANISH',
  'ENGLISH_AND_SPANISH',
] as const;
const SKIN_TYPE_VALUES = [
  'NORMAL',
  'DRY',
  'OILY',
  'COMBINATION',
  'SENSITIVE',
  'OTHER',
] as const;
const SKIN_TONE_VALUES = [
  'SHADE_1', 'SHADE_2', 'SHADE_3', 'SHADE_4', 'SHADE_5',
  'SHADE_6', 'SHADE_7', 'SHADE_8', 'SHADE_9', 'SHADE_10',
  'SHADE_11', 'SHADE_12', 'SHADE_13', 'SHADE_14', 'SHADE_15',
  'SHADE_16', 'SHADE_17', 'SHADE_18', 'SHADE_19', 'SHADE_20',
] as const;

const asText = (value: unknown): string =>
  typeof value === 'string' ? value : '';

const asOptionalText = (value?: string | null): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const isOneOf = <T extends readonly string[]>(
  values: T,
  value: unknown
): value is T[number] =>
  typeof value === 'string' && values.includes(value);

const toBirthDate = (formData: MyPageProfileForm): string | undefined => {
  const year = formData.birthYear?.trim();
  const month = formData.birthMonth?.trim();
  const day = formData.birthDay?.trim();
  if (!year || !month || !day) return undefined;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const toCreatorUpdatePayload = (
  formData: MyPageProfileForm,
  profileImageUrl?: string | null
): CreatorMyPageUpdateRequest => {
  const birthDate = toBirthDate(formData);
  return {
    profileImageUrl: asOptionalText(profileImageUrl),
    creatorName: asOptionalText(formData.id),
    firstName: asOptionalText(formData.firstName),
    lastName: asOptionalText(formData.lastName),
    birthDate,
    gender: isOneOf(GENDER_VALUES, formData.gender) ? formData.gender : undefined,
    countryCode: asOptionalText(formData.phoneCountryCode),
    phoneNumber: asOptionalText(formData.phoneNumber),
    contentLanguage: isOneOf(CONTENT_LANGUAGE_VALUES, formData.contentLanguage)
      ? formData.contentLanguage
      : undefined,
    country: asOptionalText(formData.country),
    stateOrProvince: asOptionalText(formData.stateRegion),
    cityOrTown: asOptionalText(formData.city),
    addressLine1: asOptionalText(formData.addressLine1),
    addressLine2: asOptionalText(formData.addressLine2),
    postalCode: asOptionalText(formData.zipCode),
    skinType: isOneOf(SKIN_TYPE_VALUES, formData.skinType) ? formData.skinType : undefined,
    skinTone: isOneOf(SKIN_TONE_VALUES, formData.skinTone) ? formData.skinTone : undefined,
  };
};

const toCustomerUpdatePayload = (
  formData: MyPageProfileForm,
  profileImageUrl?: string | null
): CustomerMyPageRequest => {
  const birthDate = toBirthDate(formData);
  return {
    profileImageUrl: asOptionalText(profileImageUrl),
    customerName: asOptionalText(formData.id),
    firstName: asText(formData.firstName).trim(),
    lastName: asText(formData.lastName).trim(),
    birthDate,
    gender: isOneOf(GENDER_VALUES, formData.gender) ? formData.gender : undefined,
    countryCode: asOptionalText(formData.phoneCountryCode),
    phoneNumber: asOptionalText(formData.phoneNumber),
    contentLanguage: isOneOf(CONTENT_LANGUAGE_VALUES, formData.contentLanguage)
      ? formData.contentLanguage
      : undefined,
    country: asOptionalText(formData.country),
    stateOrProvince: asOptionalText(formData.stateRegion),
    cityOrTown: asOptionalText(formData.city),
    addressLine1: asOptionalText(formData.addressLine1),
    addressLine2: asOptionalText(formData.addressLine2),
    postalCode: asOptionalText(formData.zipCode),
    skinType: isOneOf(SKIN_TYPE_VALUES, formData.skinType) ? formData.skinType : undefined,
    skinTone: isOneOf(SKIN_TONE_VALUES, formData.skinTone) ? formData.skinTone : undefined,
  };
};

const normalizeCustomerProfileResponse = (
  response: ApiResponseCustomerMyPageResponse
): ApiResponseCreatorMyPageResponse => {
  const customerProfile = response.data;
  if (!customerProfile) {
    return {
      success: response.success,
      status: response.status,
      message: response.message,
      data: undefined,
    };
  }
  const normalizedProfile: CreatorMyPageResponse = {
    creatorId: 0,
    creatorBasicInfo: {
      creatorId: 0,
      profileImageUrl: asText(customerProfile.profileImageUrl),
      creatorName: asText(customerProfile.userName),
      firstName: asText(customerProfile.firstName),
      lastName: asText(customerProfile.lastName),
      gender: isOneOf(GENDER_VALUES, customerProfile.gender)
        ? customerProfile.gender
        : 'PREFER_NOT_TO_SAY',
      birthDate: asText(customerProfile.birthDate),
      email: asText(customerProfile.email),
      creatorLevel: 'NORMAL',
    },
    creatorContactInfo: {
      email: asText(customerProfile.email),
      countryCode: asText(customerProfile.countryCode),
      phoneNumber: asText(customerProfile.phoneNumber),
    },
    creatorAddressInfo: {
      country: asText(customerProfile.country),
      stateOrProvince: asText(customerProfile.stateOrProvince),
      cityOrTown: asText(customerProfile.cityOrTown),
      addressLine1: asText(customerProfile.addressLine1),
      addressLine2: asText(customerProfile.addressLine2),
      postalCode: asText(customerProfile.postalCode),
    },
    creatorFaceInfo: {
      skinType: isOneOf(SKIN_TYPE_VALUES, customerProfile.skinType)
        ? customerProfile.skinType
        : 'OTHER',
      skinTone: isOneOf(SKIN_TONE_VALUES, customerProfile.skinTone)
        ? customerProfile.skinTone
        : 'SHADE_1',
    },
    creatorType: 'NORMAL',
    creatorStatus: 'NOT_APPROVED',
    contentLanguage: isOneOf(CONTENT_LANGUAGE_VALUES, customerProfile.contentLanguage)
      ? customerProfile.contentLanguage
      : 'ENGLISH',
  };
  return {
    success: response.success,
    status: response.status,
    message: response.message,
    data: normalizedProfile,
  };
};

const fetchProfile = async (): Promise<ApiResponseCreatorMyPageResponse> => {
  const role = await getMyPageUserRoleOrThrow();

  if (role === 'CUSTOMER') {
    const response = await apiRequest<ApiResponseCustomerMyPageResponse>({
      endPoint: '/api/customer/profile',
    });
    if (!response.success) throw new Error();
    return normalizeCustomerProfileResponse(response);
  }

  const response = await apiRequest<ApiResponseCreatorMyPageResponse>({
    endPoint: '/api/creator/profile',
  });
  if (!response.success) throw new Error();
  return response;
};

export const useProfile = (): UseQueryResult<
  ApiResponseCreatorMyPageResponse,
  Error
> => {
  return useQuery({
    queryKey: PROFILE_KEYS.profile(),
    queryFn: fetchProfile,
  });
};

export const useUpdateProfile = (): UseMutationResult<
  ApiResponseCreatorMyPageResponse | ApiResponseVoid,
  Error,
  { formData: CreatorSignupForm | CustomerSignupForm; profileImageUrl?: string | null }
> => {
  const queryClient = useQueryClient();

  const updateProfileApi = async (
    formData: MyPageProfileForm,
    profileImageUrl?: string | null
  ): Promise<ApiResponseCreatorMyPageResponse | ApiResponseVoid> => {
    const role = await getMyPageUserRoleOrThrow();
    const isCustomer = role === 'CUSTOMER';

    const response = await apiRequest<
      ApiResponseCreatorMyPageResponse | ApiResponseVoid
    >({
      endPoint: isCustomer ? '/api/customer/profile' : '/api/creator/profile',
      method: 'PATCH',
      data: isCustomer
        ? toCustomerUpdatePayload(formData, profileImageUrl)
        : toCreatorUpdatePayload(formData, profileImageUrl),
    });

    if (!response.success) {
      throw new Error('프로필 업데이트에 실패했습니다.');
    }
    return response;
  };

  return useMutation({
    mutationFn: ({
      formData,
      profileImageUrl,
    }: {
      formData: CreatorSignupForm | CustomerSignupForm;
      profileImageUrl?: string | null;
    }) => updateProfileApi(formData, profileImageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.profile() });
    },
  });
};

interface ApiResponseProfileImage {
  data?: { profileImageUrl?: string };
}

const putFileToPresignedUrl = async (
  presignedUrl: string,
  file: File
): Promise<string> => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!response.ok) throw new Error('이미지 업로드에 실패했습니다.');
  const url = new URL(presignedUrl);
  return `${url.protocol}//${url.host}${url.pathname}`;
};

export const usePresignedUrl = ({
  file,
}: {
  file: File;
}): UseMutationResult<string, Error, void> => {
  const presignedUrlApi = async (): Promise<string> => {
    const role = await getMyPageUserRoleOrThrow();
    const response = await apiRequest<ApiResponseProfileImage>({
      endPoint:
        role === 'CUSTOMER'
          ? '/api/customer/profile/image'
          : '/api/creator/profile/image',
      method: 'POST',
      data: { mediaType: file.type },
    });

    const profileImageUrl = response?.data?.profileImageUrl;
    if (!profileImageUrl) throw new Error('Presigned URL 발급에 실패했습니다.');

    return putFileToPresignedUrl(profileImageUrl, file);
  };

  return useMutation({ mutationFn: presignedUrlApi });
};
