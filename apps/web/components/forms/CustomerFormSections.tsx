'use client';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  CommunityName,
  PersonalDetails,
  SkinInfo,
} from '../../app/[locale]/(with-layout)/sign-up/customer/components';
import { type CustomerSignupForm } from '../../app/[locale]/(with-layout)/sign-up/customer/utils/signup';

interface CustomerFormSectionsProps {
  form: UseFormReturn<CustomerSignupForm>;
  locale: string;
  userData?: Partial<CustomerSignupForm>;
  onIdCheckResult?: (checked: boolean, available: boolean) => void;
}

export function CustomerFormSections({
  form,
  locale,
  userData,
  onIdCheckResult,
}: CustomerFormSectionsProps) {
  const { reset } = form;

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  return (
    <>
      <CommunityName form={form} onIdCheckResult={onIdCheckResult} />

      <PersonalDetails form={form} locale={locale} />

      <SkinInfo form={form} />
    </>
  );
}
