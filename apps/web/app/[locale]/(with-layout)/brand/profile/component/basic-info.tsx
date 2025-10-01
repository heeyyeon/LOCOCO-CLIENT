import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { FormSection, TextFormField } from 'components/forms';

interface BasicInfoProps {
  brandNameRegister: UseFormRegisterReturn;
  managerNameRegister: UseFormRegisterReturn;
  phoneNumberRegister: UseFormRegisterReturn;
  email?: string;
  brandNameError?: string;
  managerNameError?: string;
  phoneNumberError?: string;
  emailError?: string;
}

export default function BasicInfo({
  brandNameRegister,
  managerNameRegister,
  phoneNumberRegister,
  email,
  brandNameError,
  managerNameError,
  phoneNumberError,
  emailError,
}: BasicInfoProps) {
  const t = useTranslations('brandMyPageEditProfile');

  return (
    <FormSection title={t('basicInfo.basicInfoTitle')}>
      <TextFormField
        label={t('basicInfo.brandNameFieldLabel')}
        required
        register={brandNameRegister}
        error={brandNameError}
      />
      <TextFormField
        label={t('basicInfo.managerNameFieldLabel')}
        required
        register={managerNameRegister}
        error={managerNameError}
      />
      <TextFormField
        label={t('basicInfo.phoneNumberFieldLabel')}
        required
        register={phoneNumberRegister}
        error={phoneNumberError}
      />
      <TextFormField
        label="Email"
        required
        placeholder={email}
        error={emailError}
        notice={
          <p className="caption3 text-gray-500">{t('basicInfo.emailNotice')}</p>
        }
        className="pointer-events-none"
      />
    </FormSection>
  );
}
