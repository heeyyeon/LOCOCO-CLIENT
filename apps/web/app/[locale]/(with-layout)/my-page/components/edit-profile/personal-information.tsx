import { useTranslations } from 'next-intl';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input-field';
import { Select } from '@lococo/design-system/select';

import type { ProfileFormData } from '../../hooks/use-profile';
import {
  generateDateOptions,
  generateMonthOptions,
  generateYearOptions,
} from '../../utils/get-date';
import InputWrapper from '../input-wrapper';

interface PersonalInformationProps {
  formData: ProfileFormData;
  errors: {
    birth?: { year?: string; month?: string; date?: string };
    gender?: string;
    firstName?: string;
    lastName?: string;
    phone?: { countryCode?: string; phoneNumber?: string };
    contentLanguage?: string;
    email?: string;
    birthYear?: string;
    birthMonth?: string;
    birthDate?: string;
  };
  updateBirth: (value: { year: string; month: string; date: string }) => void;
  updateGender: (value: string) => void;
  updateFirstName: (value: string) => void;
  updateLastName: (value: string) => void;
  updatePhone: (value: { countryCode: string; phoneNumber: string }) => void;
  updateContentLanguage: (value: string) => void;
  updateEmail: (value: string) => void;
}

export default function PersonalInformation({
  formData,
  errors,
  updateBirth,
  updateGender,
  updateFirstName,
  updateLastName,
  updatePhone,
  updateContentLanguage,
  updateEmail,
}: PersonalInformationProps) {
  const t = useTranslations('myPage.editProfile.personalInformation');
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <p className="title2 text-gray-800">{t('title')}</p>
      <InputWrapper label="Birth" required>
        <div className="flex gap-[2.4rem]">
          <Select
            options={generateYearOptions().map((option) => ({
              value: option.label,
              label: option.label,
            }))}
            size="small"
            onValueChange={(value) =>
              updateBirth({
                year: value,
                month: formData.birth.month,
                date: formData.birth.date,
              })
            }
            placeholder={t('year')}
            value={formData.birth.year}
            isError={!!errors.birthYear}
            errorText={errors.birthYear}
          />
          <Select
            options={generateMonthOptions().map((option) => ({
              value: option.label,
              label: option.label,
            }))}
            size="small"
            onValueChange={(value) =>
              updateBirth({
                year: formData.birth.year,
                month: value,
                date: formData.birth.date,
              })
            }
            placeholder={t('month')}
            value={formData.birth.month}
            isError={!!errors.birthMonth}
            errorText={errors.birthMonth}
          />
          <Select
            options={generateDateOptions().map((option) => ({
              value: option.label,
              label: option.label,
            }))}
            size="small"
            onValueChange={(value) =>
              updateBirth({
                year: formData.birth.year,
                month: formData.birth.month,
                date: value,
              })
            }
            placeholder={t('date')}
            value={formData.birth.date}
            isError={!!errors.birthDate}
            errorText={errors.birthDate}
          />
        </div>
      </InputWrapper>
      <InputWrapper label={t('gender')} required>
        <Select
          options={[
            { label: 'Male' },
            { label: 'Female' },
            { label: 'Non-binary' },
            { label: 'Prefer not to say' },
          ]}
          onValueChange={(value) => updateGender(value)}
          placeholder={t('gender')}
          value={formData.gender}
          isError={!!errors.gender}
          errorText={errors.gender}
        />
      </InputWrapper>

      <InputWrapper
        label={t('firstName')}
        required
        notice={errors.firstName && <ErrorNotice message={errors.firstName} />}
      >
        <Input
          value={formData.firstName}
          onChange={(e) => updateFirstName(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper
        label={t('lastName')}
        required
        notice={errors.lastName && <ErrorNotice message={errors.lastName} />}
      >
        <Input
          value={formData.lastName}
          onChange={(e) => updateLastName(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper
        label={t('phoneNumber')}
        required
        notice={
          (!!errors.phone?.phoneNumber || !!errors.phone?.countryCode) && (
            <ErrorNotice
              message={
                errors.phone?.phoneNumber || errors.phone?.countryCode || ''
              }
            />
          )
        }
      >
        <div className="flex gap-[2.4rem]">
          <Select
            options={[{ label: '+82' }, { label: '+86' }]}
            size="small"
            onValueChange={(value) =>
              updatePhone({
                countryCode: value,
                phoneNumber: formData.phone.phoneNumber,
              })
            }
            placeholder={t('countryCode')}
            value={formData.phone.countryCode}
          />

          <Input
            value={formData.phone.phoneNumber}
            onChange={(e) =>
              updatePhone({
                countryCode: formData.phone.countryCode,
                phoneNumber: e.target.value,
              })
            }
            className="w-[26.4rem]"
          />
        </div>
      </InputWrapper>

      <InputWrapper label={t('contentLanguage')} required>
        <Select
          options={[
            { label: 'English' },
            { label: 'Korean' },
            { label: 'Spanish' },
          ]}
          onValueChange={(value) => updateContentLanguage(value)}
          placeholder={t('contentLanguage')}
          value={formData.contentLanguage}
          isError={!!errors.contentLanguage}
          errorText={errors.contentLanguage}
        />
      </InputWrapper>

      <InputWrapper
        label={t('email')}
        required
        notice={errors.email && <ErrorNotice message={errors.email} />}
      >
        <Input
          value={formData.email}
          onChange={(e) => updateEmail(e.target.value)}
          placeholder="jessica.anderson@gmail.com"
        />
      </InputWrapper>
    </section>
  );
}
