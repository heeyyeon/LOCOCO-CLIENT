'use client';

import { useLocale, useTranslations } from 'next-intl';

import {
  CreatorFormSections,
  SignupFormLayout,
} from '../../../../../components/forms';
import { useCreatorForm } from './hooks/useCreatorForm';

export default function CreatorSignupPage() {
  const locale = useLocale();
  const t = useTranslations('creatorSignup.layout');
  const { form, handleBack, handleNext } = useCreatorForm();

  const handleSubmit = form.handleSubmit((data) => {
    handleNext(data);
  });

  return (
    <SignupFormLayout
      title={t('title')}
      onBack={handleBack}
      onSubmit={handleSubmit}
      isValid={form.formState.isValid}
      submitLabel={t('next')}
    >
      <CreatorFormSections form={form} locale={locale} />
    </SignupFormLayout>
  );
}
