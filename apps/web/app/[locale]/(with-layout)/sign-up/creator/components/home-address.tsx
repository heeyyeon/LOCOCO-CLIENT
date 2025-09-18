import { UseFormReturn } from 'react-hook-form';

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
  const countries = countryNameOptions(locale);

  return (
    <div className="mt-[4.8rem]">
      <FormSection
        title="Home Address"
        description="Please provide your home address for product delivery."
      >
        <SelectFormField
          label="Country"
          required
          placeholder="Country"
          options={countries}
          onValueChange={(value) =>
            form.setValue('country', value, { shouldValidate: true })
          }
          error={form.formState.errors.country?.message}
        />

        <TextFormField
          label="State/Region/Province"
          required
          placeholder="ex: Illinois"
          register={form.register('stateRegion')}
          error={form.formState.errors.stateRegion?.message}
        />

        <TextFormField
          label="City / Town"
          required
          placeholder="ex: Chicago"
          register={form.register('city')}
          error={form.formState.errors.city?.message}
        />

        <TextFormField
          label="Address Line 1"
          required
          placeholder="ex: 233 S Wacker Dr"
          register={form.register('addressLine1')}
          error={form.formState.errors.addressLine1?.message}
        />

        <TextFormField
          label="Address Line 2"
          placeholder="ex: Apt 25B"
          register={form.register('addressLine2')}
          error={form.formState.errors.addressLine2?.message}
        />

        <TextFormField
          label="Zip/Post Code"
          placeholder="ex: 60606"
          register={form.register('zipCode')}
          error={form.formState.errors.zipCode?.message}
        />
      </FormSection>
    </div>
  );
}
