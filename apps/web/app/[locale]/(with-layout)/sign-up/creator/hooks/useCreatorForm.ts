import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { getCreatorInfo, registerCreatorInfo } from '../apis/creator-form';
import {
  transformApiToForm,
  transformFormToApi,
} from '../utils/api-transformers';
import { type CreatorSignupForm, creatorSignupSchema } from '../utils/signup';

export const useCreatorForm = () => {
  const router = useRouter();
  const t = useTranslations('creatorSignup.validation');
  const tCommunity = useTranslations('creatorSignup.communityName');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idCheckStatus, setIdCheckStatus] = useState<{
    checked: boolean;
    available: boolean;
  }>({ checked: false, available: false });

  const form = useForm<CreatorSignupForm>({
    resolver: zodResolver(creatorSignupSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      id: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
      gender: '',
      firstName: '',
      lastName: '',
      phoneCountryCode: '',
      phoneNumber: '',
      contentLanguage: '',
      country: '',
      stateRegion: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      zipCode: '',
      skinType: '',
      skinTone: '',
    },
  });

  const cleanFormData = (
    data: Partial<CreatorSignupForm>
  ): CreatorSignupForm => {
    return {
      id: data.id || '',
      birthMonth: data.birthMonth || '',
      birthDay: data.birthDay || '',
      birthYear: data.birthYear || '',
      gender: data.gender || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      phoneCountryCode: data.phoneCountryCode || '',
      phoneNumber: data.phoneNumber || '',
      contentLanguage: data.contentLanguage || '',
      country: data.country || '',
      stateRegion: data.stateRegion || '',
      city: data.city || '',
      addressLine1: data.addressLine1 || '',
      addressLine2: data.addressLine2 || '',
      zipCode: data.zipCode || '',
      skinType: data.skinType || '',
      skinTone: data.skinTone || '',
    };
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCreatorInfo();

        if (response.success && response.data) {
          const formData = transformApiToForm(response.data);
          const cleanedFormData = cleanFormData(formData);
          form.reset(cleanedFormData);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('403')) {
          return;
        }
        throw error;
      }
    };

    fetchUserData();
  }, [form]);

  const handleBack = () => {
    router.back();
  };

  const handleNext = async (data: CreatorSignupForm) => {
    // ID 중복 확인을 하지 않은 경우
    if (!idCheckStatus.checked) {
      form.setError('id', {
        type: 'manual',
        message: t('idAvailabilityCheck'),
      });
      return false;
    }

    // ID가 사용 불가능한 경우
    if (!idCheckStatus.available) {
      form.setError('id', {
        type: 'manual',
        message: tCommunity('idTaken'),
      });
      return false;
    }

    const cleanedData = cleanFormData(data);
    setIsSubmitting(true);

    const apiData = transformFormToApi(cleanedData);
    const response = await registerCreatorInfo(apiData);

    if (response.success) {
      router.push('/sign-up/creator/sns-links');
    }

    setIsSubmitting(false);
    return true;
  };

  const handleIdCheckResult = useCallback(
    (checked: boolean, available: boolean) => {
      setIdCheckStatus({ checked, available });
    },
    []
  );

  return {
    form,
    isSubmitting,
    handleBack,
    handleNext,
    handleIdCheckResult,
  };
};
