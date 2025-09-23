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
  onCheckAvailability: () => void;
  userData?: Partial<CreatorSignupForm>;
}

export function CreatorFormSections({
  form,
  locale,
  onCheckAvailability,
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
      <CommunityName
        form={form}
        handleCheckAvailability={onCheckAvailability}
      />

      <PersonalDetails form={form} />

      <HomeAddress form={form} locale={locale} />

      <SkinInfo form={form} />
    </>
  );
}
