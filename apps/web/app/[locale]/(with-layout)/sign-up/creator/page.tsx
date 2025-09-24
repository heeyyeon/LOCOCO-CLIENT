'use client';

import { useLocale } from 'next-intl';

import {
  CreatorFormSections,
  SignupFormLayout,
} from '../../../../../components/forms';
import { useCreatorForm } from './hooks/useCreatorForm';

export default function CreatorSignupPage() {
  const locale = useLocale();
  const { form, isSubmitting, handleBack, handleNext } = useCreatorForm();

  return (
    <SignupFormLayout
      title="Join Lococo Creator Community!"
      onBack={handleBack}
      onSubmit={form.handleSubmit(handleNext)}
      isValid={form.formState.isValid}
      submitLabel="Next"
      isSubmitting={isSubmitting}
    >
      <CreatorFormSections form={form} locale={locale} />
    </SignupFormLayout>
  );
}
