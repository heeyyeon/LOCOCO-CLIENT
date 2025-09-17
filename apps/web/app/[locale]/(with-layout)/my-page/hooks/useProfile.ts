'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { createSingleImageValidator } from '../../../../../hooks/useFileUploader';
import { PROFILE_TEXT_ERROR_MESSAGE_KEYS } from '../constant/editProfile';

export type ProfileFormData = {
  id: string;
  birth: {
    year: string;
    month: string;
    date: string;
  };
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: {
    countryCode: string;
    phoneNumber: string;
  };
  contentLanguage: string;
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  zip?: string;
  profileImage?: File;
  skinType: string;
  skinTone: string;
};

export const useProfile = (userId?: number, onSuccess?: () => void) => {
  const t = useTranslations('myPage.editProfile');

  // ID 중복 체크 관련
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idCheckError, setIdCheckError] = useState<string>('');

  const birthSchema = z.object({
    year: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.BIRTH.YEAR)),
    month: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.BIRTH.MONTH)),
    date: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.BIRTH.DATE)),
  });

  const phoneSchema = z.object({
    countryCode: z
      .string()
      .min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.PHONE.COUNTRY_CODE)),
    phoneNumber: z
      .string()
      .min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.PHONE.PHONE_NUMBER)),
  });

  const profileSchema = z.object({
    id: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.ID)),
    birth: birthSchema,
    gender: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.GENDER)),
    firstName: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.FIRST_NAME)),
    lastName: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.LAST_NAME)),
    email: z.string().email(t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.EMAIL)),
    phone: phoneSchema,
    contentLanguage: z
      .string()
      .min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.CONTENT_LANGUAGE)),
    country: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.COUNTRY)),
    state: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.STATE)),
    city: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.CITY)),
    addressLine1: z
      .string()
      .min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.ADDRESS_LINE_1)),
    addressLine2: z.string().optional(),
    zip: z.string().optional(),
    profileImage: createSingleImageValidator(
      t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.PROFILE_IMAGE)
    ).optional(),
    skinType: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.SKIN_TYPE)),
    skinTone: z.string().min(1, t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.SKIN_TONE)),
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: '',
      birth: {
        year: '',
        month: '',
        date: '',
      },
      gender: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: {
        countryCode: '',
        phoneNumber: '',
      },
      contentLanguage: '',
      country: '',
      state: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      zip: '',
      profileImage: undefined,
      skinType: '',
      skinTone: '',
    },
    mode: 'onChange',
  });

  const formData = watch();

  const updateId = (id: string) => {
    setValue('id', id, { shouldValidate: true });

    if (isIdChecked) {
      setIsIdChecked(false);
      setIdCheckError('');
    }
  };

  const checkIdAvailability = async () => {
    if (!formData.id.trim()) {
      setIdCheckError(t(PROFILE_TEXT_ERROR_MESSAGE_KEYS.ID));
      return;
    }
    setIdCheckError('');
    // TODO: ID 중복 체크 API 연동
  };

  const updateBirth = (birth: {
    year: string;
    month: string;
    date: string;
  }) => {
    setValue('birth', birth, { shouldValidate: true });
    trigger('birth');
  };

  const updateGender = (gender: string) => {
    setValue('gender', gender, { shouldValidate: true });
  };

  const updateFirstName = (firstName: string) => {
    setValue('firstName', firstName, { shouldValidate: true });
  };

  const updateLastName = (lastName: string) => {
    setValue('lastName', lastName, { shouldValidate: true });
  };

  const updateEmail = (email: string) => {
    setValue('email', email, { shouldValidate: true });
  };

  const updatePhone = (phone: { countryCode: string; phoneNumber: string }) => {
    setValue('phone', phone, { shouldValidate: true });
  };

  const updateContentLanguage = (contentLanguage: string) => {
    setValue('contentLanguage', contentLanguage, { shouldValidate: true });
  };

  const updateCountry = (country: string) => {
    setValue('country', country, { shouldValidate: true });
  };

  const updateState = (state: string) => {
    setValue('state', state, { shouldValidate: true });
  };

  const updateCity = (city: string) => {
    setValue('city', city, { shouldValidate: true });
  };

  const updateAddressLine1 = (addressLine1: string) => {
    setValue('addressLine1', addressLine1, { shouldValidate: true });
  };

  const updateAddressLine2 = (addressLine2: string) => {
    setValue('addressLine2', addressLine2, { shouldValidate: true });
  };

  const updateZip = (zip: string) => {
    setValue('zip', zip, { shouldValidate: true });
  };

  const updateProfileImage = (profileImage: File | undefined) => {
    setValue('profileImage', profileImage, { shouldValidate: true });
  };

  const updateSkinType = (skinType: string) => {
    setValue('skinType', skinType, { shouldValidate: true });
  };

  const updateSkinTone = (skinTone: string) => {
    setValue('skinTone', skinTone, { shouldValidate: true });
  };

  const parsePresignedUrl = (rawPresignedUrl: string) => {
    return rawPresignedUrl.split('?')[0] || '';
  };

  const onSubmit = async (formData: ProfileFormData) => {
    try {
      //TODO: 1. 프로필 이미지 presigned URL 요청 및 업로드
      let profileImageUrl: string = '';
      if (formData.profileImage) {
      }

      //TODO: 2. 프로필 수정 요청
      if (userId) {
        //TODO: 프로필 수정 API 호출
        console.log('프로필 수정 데이터:', {
          ...formData,
          profileImageUrl: profileImageUrl
            ? parsePresignedUrl(profileImageUrl)
            : undefined,
        });

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('프로필 수정 실패:', error);
    }
  };

  const compatibleFormData = {
    id: formData.id,
    birth: formData.birth,
    gender: formData.gender,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    contentLanguage: formData.contentLanguage,
    country: formData.country,
    state: formData.state,
    city: formData.city,
    addressLine1: formData.addressLine1,
    addressLine2: formData.addressLine2,
    zip: formData.zip,

    profileImage: formData.profileImage,
    skinType: formData.skinType,
    skinTone: formData.skinTone,
  };

  const compatibleErrors = {
    id: errors.id?.message,
    birth: errors.birth?.message,
    birthYear: errors.birth?.year?.message,
    birthMonth: errors.birth?.month?.message,
    birthDate: errors.birth?.date?.message,
    gender: errors.gender?.message,
    firstName: errors.firstName?.message,
    lastName: errors.lastName?.message,
    email: errors.email?.message,
    phone: errors.phone?.message,
    phoneCountryCode: errors.phone?.countryCode?.message,
    phoneNumber: errors.phone?.phoneNumber?.message,
    contentLanguage: errors.contentLanguage?.message,
    country: errors.country?.message,
    state: errors.state?.message,
    city: errors.city?.message,
    addressLine1: errors.addressLine1?.message,
    addressLine2: errors.addressLine2?.message,
    zip: errors.zip?.message,
    profileImage: errors.profileImage?.message,
    skinType: errors.skinType?.message,
    skinTone: errors.skinTone?.message,
  };

  return {
    formData: compatibleFormData,
    errors: compatibleErrors,
    reset,
    updateId,
    updateBirth,
    updateGender,
    updateFirstName,
    updateLastName,
    updateEmail,
    updatePhone,
    updateContentLanguage,
    updateCountry,
    updateState,
    updateCity,
    updateAddressLine1,
    updateAddressLine2,
    updateZip,

    updateProfileImage,
    updateSkinType,
    updateSkinTone,
    handleSubmit: handleSubmit(onSubmit),
    isFormValid: isValid,
    trigger,
    // ID 중복 체크 관련
    isIdChecked,
    idCheckError,
    checkIdAvailability,
  };
};
