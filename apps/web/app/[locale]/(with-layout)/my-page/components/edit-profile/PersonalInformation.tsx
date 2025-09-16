import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input-field';
import { Select } from '@lococo/design-system/select';

import type { ProfileFormData } from '../../hooks/useProfile';
import {
  generateDateOptions,
  generateMonthOptions,
  generateYearOptions,
} from '../../utils/get-date';
import InputWrapper from '../input-wrapper';

interface PersonalInformationProps {
  formData: ProfileFormData;
  errors: any;
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
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <p className="inter-title2 text-gray-800">Personal Details</p>
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
            placeholder="Year"
            value={formData.birth.year}
            isError={errors.birthYear}
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
            placeholder="Month"
            value={formData.birth.month}
            isError={errors.birthMonth}
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
            placeholder="Date"
            value={formData.birth.date}
            isError={errors.birthDate}
            errorText={errors.birthDate}
          />
        </div>
      </InputWrapper>
      <InputWrapper label="Gender" required>
        <Select
          options={[
            { label: 'Male' },
            { label: 'Female' },
            { label: 'Non-binary' },
            { label: 'Prefer not to say' },
          ]}
          onValueChange={(value) => updateGender(value)}
          placeholder="Gender"
          value={formData.gender}
          isError={errors.gender}
          errorText={errors.gender}
        />
      </InputWrapper>

      <InputWrapper
        label="First Name"
        required
        notice={errors.firstName && <ErrorNotice message={errors.firstName} />}
      >
        <Input
          value={formData.firstName}
          onChange={(e) => updateFirstName(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper
        label="Last Name"
        required
        notice={errors.lastName && <ErrorNotice message={errors.lastName} />}
      >
        <Input
          value={formData.lastName}
          onChange={(e) => updateLastName(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper
        label="Phone Number"
        required
        notice={
          (errors.phoneNumber || errors.phoneCountryCode) && (
            <ErrorNotice
              message={errors.phoneNumber || errors.phoneCountryCode}
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
            placeholder="Country Code"
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

      <InputWrapper label="Content Language" required>
        <Select
          options={[
            { label: 'English' },
            { label: 'Korean' },
            { label: 'Spanish' },
          ]}
          onValueChange={(value) => updateContentLanguage(value)}
          placeholder="Content Language"
          value={formData.contentLanguage}
          isError={errors.contentLanguage}
          errorText={errors.contentLanguage}
        />
      </InputWrapper>

      <InputWrapper
        label="Email"
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
