import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  CommunityName,
  HomeAddress,
  PersonalDetails,
  SkinInfo,
} from '../../app/[locale]/(with-layout)/sign-up/creator/components';
import { type CreatorSignupForm } from '../../app/[locale]/(with-layout)/sign-up/creator/utils/signup';

interface CreatorFormSectionsProps {
  form: UseFormReturn<CreatorSignupForm>;
  locale: string;
  userData?: Partial<CreatorSignupForm>;
}

export function CreatorFormSections({
  form,
  locale,
  userData,
}: CreatorFormSectionsProps) {
  const { reset } = form;

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  return (
    <>
      <CommunityName form={form} />

      <PersonalDetails form={form} />

      <HomeAddress form={form} locale={locale} />

      <SkinInfo form={form} />
    </>
  );
}
