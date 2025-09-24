'use client';

import { useForm } from 'react-hook-form';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  CreatorFormSections,
  SignupFormLayout,
} from '../../../../../components/forms';
import { type CreatorSignupForm, creatorSignupSchema } from './utils/signup';

export default function CreatorSignupPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('creatorSignup.validation');

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

  const handleNext = () => {
    router.push('/sign-up/creator/sns-links');
  };

  return (
    <SignupFormLayout
      title="Join Lococo Creator Community!"
      onBack={() => router.back()}
      onSubmit={form.handleSubmit(handleNext)}
      isValid={form.formState.isValid}
      submitLabel="Next"
    >
      <CreatorFormSections form={form} locale={locale} />
    </SignupFormLayout>
  );
}
