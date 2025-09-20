'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  CreatorFormSections,
  SignupFormLayout,
} from '../../../../../components/forms';
import { type CreatorSignupForm, creatorSignupSchema } from './utils/signup';

export default function CreatorSignupPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('creatorSignup.validation');

  const form = useForm<CreatorSignupForm>({
    resolver: zodResolver(creatorSignupSchema(t)),
    mode: 'onChange',
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

  const handleCheckAvailability = () => {
    // TODO: ID 중복 확인 API 호출
  };

  return (
    <SignupFormLayout
      title="Join Lococo Creator Community!"
      onBack={() => router.back()}
      onSubmit={form.handleSubmit(handleNext)}
      isValid={form.formState.isValid}
      submitLabel="Next"
    >
      <CreatorFormSections
        form={form}
        locale={locale}
        onCheckAvailability={handleCheckAvailability}
      />
    </SignupFormLayout>
  );
}
