import { UseFormReturn } from 'react-hook-form';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input';
import { Select } from '@lococo/design-system/select';

import {
  FormSection,
  SelectFormField,
  TextFormField,
} from '../../../../../../components/forms';
import {
  CONTENT_LANGUAGES,
  GENDERS,
} from '../../../../../../constants/creator-options';
import {
  birthDateOptions,
  countryPhoneCodeOptions,
} from '../../../../../../utils';
import { type CreatorSignupForm } from '../hooks/signup';

interface PersonalDetailsProps {
  form: UseFormReturn<CreatorSignupForm>;
}

export function PersonalDetails({ form }: PersonalDetailsProps) {
  const { months, days, years } = birthDateOptions();
  const countryCodes = countryPhoneCodeOptions();

  return (
    <div className="mt-[4.8rem]">
      <FormSection
        title="Personal Details"
        description="Please write your date of birth without any additional information."
      >
        <div className="space-y-[1.6rem]">
          <SelectFormField label="Birth" required>
            <div className="flex flex-col">
              <div className="flex gap-[2.4rem]">
                <Select
                  placeholder="Month"
                  options={months}
                  onValueChange={(selectedLabel) => {
                    const selectedMonth = months.find(
                      (option) => option.label === selectedLabel
                    );
                    form.setValue(
                      'birthMonth',
                      selectedMonth?.value || selectedLabel,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                  size="small"
                />
                <Select
                  placeholder="Day"
                  options={days}
                  onValueChange={(selectedLabel) => {
                    const selectedDay = days.find(
                      (option) => option.label === selectedLabel
                    );
                    form.setValue(
                      'birthDay',
                      selectedDay?.value || selectedLabel,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                  size="small"
                />
                <Select
                  placeholder="Year"
                  options={years}
                  onValueChange={(selectedLabel) => {
                    const selectedYear = years.find(
                      (option) => option.label === selectedLabel
                    );
                    form.setValue(
                      'birthYear',
                      selectedYear?.value || selectedLabel,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                  size="small"
                />
              </div>
              {(form.formState.errors.birthMonth ||
                form.formState.errors.birthDay ||
                form.formState.errors.birthYear) && (
                <div className="mt-[0.8rem]">
                  <ErrorNotice
                    message={
                      form.formState.errors.birthMonth?.message ||
                      form.formState.errors.birthDay?.message ||
                      form.formState.errors.birthYear?.message ||
                      ''
                    }
                  />
                </div>
              )}
            </div>
          </SelectFormField>

          <SelectFormField
            label="Gender"
            required
            placeholder="Gender"
            options={GENDERS}
            onValueChange={(value) =>
              form.setValue('gender', value, { shouldValidate: true })
            }
            error={form.formState.errors.gender?.message}
          />

          <TextFormField
            label="First name"
            required
            placeholder="ex: John"
            register={form.register('firstName')}
            error={form.formState.errors.firstName?.message}
          />

          <TextFormField
            label="Last name"
            required
            placeholder="ex: Doe"
            register={form.register('lastName')}
            error={form.formState.errors.lastName?.message}
          />

          <SelectFormField label="Phone Number" required>
            <div className="flex flex-col">
              <div className="flex gap-[2.4rem]">
                <Select
                  placeholder="+XX"
                  options={countryCodes}
                  onValueChange={(selectedLabel) => {
                    const selectedCountryCode = countryCodes.find(
                      (option) => option.label === selectedLabel
                    );
                    form.setValue(
                      'phoneCountryCode',
                      selectedCountryCode?.value || selectedLabel,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                  size="small"
                />
                <Input
                  type="default"
                  placeholder="ex: XXXXXXXXXX"
                  className="h-[4rem] w-[26.4rem]"
                  maxLength={12}
                  {...form.register('phoneNumber', {
                    onChange: () =>
                      form.trigger(['phoneCountryCode', 'phoneNumber']),
                  })}
                />
              </div>
              {(form.formState.errors.phoneCountryCode ||
                form.formState.errors.phoneNumber) && (
                <div className="mt-[0.8rem]">
                  <ErrorNotice
                    message={
                      form.formState.errors.phoneCountryCode?.message ||
                      form.formState.errors.phoneNumber?.message ||
                      ''
                    }
                  />
                </div>
              )}
            </div>
          </SelectFormField>

          <SelectFormField
            label="Content Language"
            required
            placeholder="Content Language"
            options={CONTENT_LANGUAGES}
            onValueChange={(value) =>
              form.setValue('contentLanguage', value, {
                shouldValidate: true,
              })
            }
            error={form.formState.errors.contentLanguage?.message}
          />
        </div>
      </FormSection>
    </div>
  );
}
