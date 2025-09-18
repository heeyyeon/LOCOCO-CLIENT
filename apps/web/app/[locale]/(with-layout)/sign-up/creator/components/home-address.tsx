import { UseFormReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import {
  FormSection,
  SelectFormField,
  TextFormField,
} from '../../../../../../components/forms';
import { countryNameOptions } from '../../../../../../utils';
import { type CreatorSignupForm } from '../hooks/signup';

interface HomeAddressProps {
  form: UseFormReturn<CreatorSignupForm>;
  locale: string;
}

export function HomeAddress({ form, locale }: HomeAddressProps) {
  const t = useTranslations('creatorSignup.homeAddress');
  const countries = countryNameOptions(locale);

  return (
    <div className="mt-[4.8rem]">
      <FormSection title={t('title')} description={t('description')}>
        <SelectFormField
          label={t('countryLabel')}
          required
          placeholder={t('countryPlaceholder')}
          options={countries}
          onValueChange={(value) =>
            form.setValue('country', value, { shouldValidate: true })
          }
          error={form.formState.errors.country?.message}
        />

        <TextFormField
          label={t('stateLabel')}
          required
          placeholder={t('statePlaceholder')}
          register={form.register('stateRegion')}
          error={form.formState.errors.stateRegion?.message}
        />

        <TextFormField
          label={t('cityLabel')}
          required
          placeholder={t('cityPlaceholder')}
          register={form.register('city')}
          error={form.formState.errors.city?.message}
        />

        <TextFormField
          label={t('addressLine1Label')}
          required
          placeholder={t('addressLine1Placeholder')}
          register={form.register('addressLine1')}
          error={form.formState.errors.addressLine1?.message}
        />

        <TextFormField
          label={t('addressLine2Label')}
          placeholder={t('addressLine2Placeholder')}
          register={form.register('addressLine2')}
          error={form.formState.errors.addressLine2?.message}
        />

        <TextFormField
          label={t('zipCodeLabel')}
          placeholder={t('zipCodePlaceholder')}
          register={form.register('zipCode')}
          error={form.formState.errors.zipCode?.message}
        />
      </FormSection>
    </div>
  );
}
