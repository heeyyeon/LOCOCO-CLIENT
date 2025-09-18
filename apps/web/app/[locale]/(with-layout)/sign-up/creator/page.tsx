'use client';

import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignupFormLayout } from '../../../../../components/forms';
import { CommunityName } from './components/community-name';
import { HomeAddress } from './components/home-address';
import { PersonalDetails } from './components/personal-details';
import { SkinInfo } from './components/skin-info';
import { type CreatorSignupForm, creatorSignupSchema } from './hooks/signup';

export default function CreatorSignupPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const form = useForm<CreatorSignupForm>({
    resolver: zodResolver(creatorSignupSchema),
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
      <CommunityName
        form={form}
        handleCheckAvailability={handleCheckAvailability}
      />

      <PersonalDetails form={form} />

      <HomeAddress form={form} locale={locale} />

      <SkinInfo form={form} />
    </SignupFormLayout>
  );
}
