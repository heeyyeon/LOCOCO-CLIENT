'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ADDRESS_TEXT_ERROR_MESSAGE_KEYS } from '../constants/address';

export type AddressFormData = {
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  zip?: string;
};

export const useAddress = (userId?: number, onSuccess?: () => void) => {
  const t = useTranslations('myPage.editProfile');

  const addressSchema = z.object({
    country: z.string().min(1, t(ADDRESS_TEXT_ERROR_MESSAGE_KEYS.COUNTRY)),
    state: z.string().min(1, t(ADDRESS_TEXT_ERROR_MESSAGE_KEYS.STATE)),
    city: z.string().min(1, t(ADDRESS_TEXT_ERROR_MESSAGE_KEYS.CITY)),
    addressLine1: z
      .string()
      .min(1, t(ADDRESS_TEXT_ERROR_MESSAGE_KEYS.ADDRESS_LINE_1)),
    addressLine2: z.string().optional(),
    zip: z.string().optional(),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: '',
      state: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      zip: '',
    },

    mode: 'onChange',
  });

  const formData = watch();

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
    trigger('addressLine1');
  };

  const updateAddressLine2 = (addressLine2: string) => {
    setValue('addressLine2', addressLine2, { shouldValidate: true });
  };

  const updateZip = (zip: string) => {
    setValue('zip', zip, { shouldValidate: true });
  };

  const onSubmit = async (_formData: AddressFormData) => {
    //TODO: 주소 API 호출
    if (userId && onSuccess) {
      onSuccess();
    }
  };

  const compatibleFormData = {
    country: formData.country,
    state: formData.state,
    city: formData.city,
    addressLine1: formData.addressLine1,
    addressLine2: formData.addressLine2,
    zip: formData.zip,
  };

  const compatibleErrors = {
    country: errors.country?.message,
    state: errors.state?.message,
    city: errors.city?.message,
    addressLine1: errors.addressLine1?.message,
    addressLine2: errors.addressLine2?.message,
    zip: errors.zip?.message,
  };

  return {
    formData: compatibleFormData,
    errors: compatibleErrors,
    updateCountry,
    updateState,
    updateCity,
    updateAddressLine1,
    updateAddressLine2,
    updateZip,
    handleSubmit: handleSubmit(onSubmit),
    isFormValid: isValid,
    trigger,
  };
};
