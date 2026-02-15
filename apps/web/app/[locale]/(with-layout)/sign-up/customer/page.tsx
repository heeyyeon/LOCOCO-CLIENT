'use client';

import { useLocale, useTranslations } from 'next-intl';

import {
  CustomerFormSections,
  SignupFormLayout,
} from '../../../../../components/forms';
import { useCustomerForm } from './hooks/useCustomerForm';

const CUSTOMER_SIGNUP_TITLES = {
  ko: '로코코 커뮤니티에 가입하세요!',
  en: 'Join Lococo Community!',
  es: '¡Únete a la comunidad de Lococo!',
} as const;

export default function CustomerSignupPage() {
  const locale = useLocale();
  const t = useTranslations('creatorSignup.layout');
  const { form, handleBack, handleNext, handleIdCheckResult } =
    useCustomerForm();

  const handleSubmit = form.handleSubmit((data) => {
    handleNext(data);
  });
  const normalizedLocale = locale as keyof typeof CUSTOMER_SIGNUP_TITLES;
  const signupTitle =
    CUSTOMER_SIGNUP_TITLES[normalizedLocale] ?? CUSTOMER_SIGNUP_TITLES.en;

  return (
    <SignupFormLayout
      title={signupTitle}
      onBack={handleBack}
      onSubmit={handleSubmit}
      isValid={form.formState.isValid}
      submitLabel={t('next')}
    >
      <CustomerFormSections
        form={form}
        locale={locale}
        onIdCheckResult={handleIdCheckResult}
      />
    </SignupFormLayout>
  );
}
