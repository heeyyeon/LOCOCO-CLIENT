'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  CreatorFormSections,
  SignupFormLayout,
} from '../../../../../components/forms';
import { registerCreatorInfo } from './apis/creator-form';
import { type CreatorSignupForm, creatorSignupSchema } from './utils/signup';

export default function CreatorSignupPage() {
  const router = useRouter();
  const locale = useLocale();
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
      phoneCountryCode: '',
      phoneNumber: '',
      contentLanguage: '',
      country: '',
      skinType: '',
      skinTone: '',
    },
  });

  const handleNext = async (data: CreatorSignupForm) => {
    setIsSubmitting(true);

    const apiRequestData = {
      creatorName: data.id,
      birthDate: `${data.birthYear}-${data.birthMonth.padStart(2, '0')}-${data.birthDay.padStart(2, '0')}`,
      countryCode: data.phoneCountryCode,
      stateOrProvince: data.stateRegion,
      cityOrTown: data.city,
      postalCode: data.zipCode || null,
      ...data,
    };

    const response = await registerCreatorInfo(apiRequestData);

    if (response.success) {
      router.push('/sign-up/creator/sns-links');
    }

    setIsSubmitting(false);
  };

  return (
    <SignupFormLayout
      title="Join Lococo Creator Community!"
      onBack={() => router.back()}
      onSubmit={form.handleSubmit(handleNext)}
      isValid={form.formState.isValid}
      submitLabel="Next"
      isSubmitting={isSubmitting}
    >
      <CreatorFormSections form={form} locale={locale} />
    </SignupFormLayout>
  );
}
