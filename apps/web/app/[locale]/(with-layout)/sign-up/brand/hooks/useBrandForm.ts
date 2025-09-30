import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'i18n/navigation';

import { registerBrandInfo } from '../apis/brand-form';
import { transformFormToApi } from '../utils/api-transformers';
import { type BrandSignupForm, brandSignupSchema } from '../utils/signup';

export const useBrandForm = () => {
  const router = useRouter();
  const t = useTranslations('brandSignup.validation');
  const form = useForm<BrandSignupForm>({
    resolver: zodResolver(brandSignupSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      brandName: '',
      contactName: '',
      contactPosition: '',
      contactPhone: '',
      street: '',
      detail: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerBrandInfo,
    onSuccess: (response) => {
      if (response.success) {
        router.push('/');
      }
    },
    onError: () => {},
  });

  const handleSubmit = async (data: BrandSignupForm) => {
    const apiData = transformFormToApi(data);
    registerMutation.mutate(apiData);
  };

  const handleBack = () => {
    router.back();
  };

  return {
    form,
    handleSubmit,
    handleBack,
    isSubmitting: registerMutation.isPending,
  };
};
