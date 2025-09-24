import { useEffect, useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getCreatorInfo();

      if (response.success && response.data) {
        const formData = transformApiToForm(response.data);
        form.reset(formData);
      }
    };

    fetchUserData();
  }, [form]);

  const handleBack = () => {
    router.back();
  };

  const handleNext = async (data: CreatorSignupForm) => {
    setIsSubmitting(true);

    const apiData = transformFormToApi(data);
    const response = await registerCreatorInfo(apiData);

    if (response.success) {
      router.push('/sign-up/creator/sns-links');
    }

    setIsSubmitting(false);
  };

  return {
    form,
    isSubmitting,
    handleBack,
    handleNext,
  };
};
