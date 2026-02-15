import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { clearRoleFromLocalStorage } from '../../../login-google/utils/role-storage';
import { getCustomerInfo, registerCustomerInfo } from '../apis/customer-form';
import {
  transformApiToForm,
  transformFormToApi,
} from '../utils/api-transformers';
import { type CustomerSignupForm, customerSignupSchema } from '../utils/signup';

export const useCustomerForm = () => {
  const router = useRouter();
  const t = useTranslations('creatorSignup.validation');
  const tCommunity = useTranslations('creatorSignup.communityName');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idCheckStatus, setIdCheckStatus] = useState<{
    checked: boolean;
    available: boolean;
  }>({ checked: false, available: false });

  const form = useForm<CustomerSignupForm>({
    resolver: zodResolver(customerSignupSchema(t)),
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
      country: '',
      skinType: '',
      skinTone: '',
    },
  });

  const cleanFormData = (
    data: Partial<CustomerSignupForm>
  ): CustomerSignupForm => {
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
      country: data.country || '',
      skinType: data.skinType || '',
      skinTone: data.skinTone || '',
    };
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCustomerInfo();

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

  const handleNext = async (data: CustomerSignupForm) => {
    if (!idCheckStatus.checked) {
      form.setError('id', {
        type: 'manual',
        message: t('idAvailabilityCheck'),
      });
      return false;
    }

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
    const response = await registerCustomerInfo(apiData);

    if (response.success) {
      clearRoleFromLocalStorage();
      router.push('/');
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
