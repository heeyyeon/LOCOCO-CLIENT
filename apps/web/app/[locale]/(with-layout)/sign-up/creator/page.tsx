'use client';

import { useLocale, useTranslations } from 'next-intl';

import {
  CreatorFormSections,
  SignupFormLayout,
} from '../../../../../components/forms';
import { useCreatorForm } from './hooks/useCreatorForm';

export default function CreatorSignupPage() {
  const locale = useLocale();
  const t = useTranslations('creatorSignup.button');
  const { form, isSubmitting, handleBack, handleNext } = useCreatorForm();

  return (
    <SignupFormLayout
      title={t('title')}
      onBack={handleBack}
      onSubmit={form.handleSubmit(handleNext)}
      isValid={form.formState.isValid}
      submitLabel={t('next')}
      isSubmitting={isSubmitting}
    >
      <CreatorFormSections form={form} locale={locale} />
    </SignupFormLayout>
  );
}
