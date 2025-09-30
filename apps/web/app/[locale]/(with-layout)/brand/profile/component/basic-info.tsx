import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { FormSection, SelectFormField, TextFormField } from 'components/forms';
import { countryPhoneCodeOptions } from 'utils';

import { Input } from '@lococo/design-system/input';
import { Select } from '@lococo/design-system/select';

interface BasicInfoProps {
  brandNameRegister: UseFormRegisterReturn;
  managerNameRegister: UseFormRegisterReturn;
  phoneNumberRegister: UseFormRegisterReturn;
  emailRegister: UseFormRegisterReturn;
  countryCodeValue: string;
  brandNameError?: string;
  managerNameError?: string;
  phoneNumberError?: string;
  emailError?: string;
  onCountryCodeChange: (value: string) => void;
}

export default function BasicInfo({
  brandNameRegister,
  managerNameRegister,
  phoneNumberRegister,
  emailRegister,
  countryCodeValue,
  brandNameError,
  managerNameError,
  phoneNumberError,
  emailError,
  onCountryCodeChange,
}: BasicInfoProps) {
  const countryCodes = countryPhoneCodeOptions();

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
      <SelectFormField
        label={t('basicInfo.phoneNumberFieldLabel')}
        required
        error={phoneNumberError}
      >
        <div className="flex w-full items-center justify-start gap-[2.4rem]">
          <Select
            placeholder={'+xx'}
            options={countryCodes}
            size="small"
            value={countryCodeValue}
            onValueChange={onCountryCodeChange}
          />
          <Input className="h-[4rem] w-[26.4rem]" {...phoneNumberRegister} />
        </div>
      </SelectFormField>
      <TextFormField
        label="Email"
        required
        placeholder="jessica.anderson@gmail.com"
        register={emailRegister}
        error={emailError}
        notice={
          <p className="caption3 text-gray-500">{t('basicInfo.emailNotice')}</p>
        }
      />
    </FormSection>
  );
}
