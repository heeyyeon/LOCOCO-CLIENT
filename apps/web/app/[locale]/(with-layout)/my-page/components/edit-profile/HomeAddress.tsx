import { Input } from '@lococo/design-system/input-field';
import { Select } from '@lococo/design-system/select';

import type { ProfileFormData } from '../../hooks/useProfile';
import InputWrapper from '../input-wrapper';

export default function HomeAddress({
  formData,
  errors,
  updateCountry,
  updateState,
  updateCity,
  updateAddressLine1,
  updateAddressLine2,
  updateZip,
}: {
  formData: ProfileFormData;
  errors: any;
  updateCountry: (value: string) => void;
  updateState: (value: string) => void;
  updateCity: (value: string) => void;
  updateAddressLine1: (value: string) => void;
  updateAddressLine2: (value: string) => void;
  updateZip: (value: string) => void;
}) {
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[1.6rem]">
        <p className="inter-title2 text-gray-800">Home Address</p>
        <p className="inter-caption3 text-gray-500">
          Please provide your home address for product delivery.
        </p>
      </div>
      <InputWrapper label="Country" required>
        <Select
          options={[{ label: 'United States' }, { label: 'Canada' }]}
          onValueChange={(value) => updateCountry(value)}
          placeholder="Country"
          value={formData.country}
        />
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country}</p>
        )}
      </InputWrapper>
      <InputWrapper label="State/Region/Province" required>
        <Input
          value={formData.state}
          onChange={(e) => updateState(e.target.value)}
        />
        {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
      </InputWrapper>
      <InputWrapper label="City / Town" required>
        <Input
          value={formData.city}
          onChange={(e) => updateCity(e.target.value)}
        />
        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
      </InputWrapper>
      <InputWrapper label="Address Line 1" required>
        <Input
          value={formData.addressLine1}
          onChange={(e) => updateAddressLine1(e.target.value)}
        />
        {errors.addressLine1 && (
          <p className="text-sm text-red-500">{errors.addressLine1}</p>
        )}
      </InputWrapper>
      <InputWrapper label="Address Line 2" required>
        <Input
          value={formData.addressLine2}
          onChange={(e) => updateAddressLine2(e.target.value)}
        />
        {errors.addressLine2 && (
          <p className="text-sm text-red-500">{errors.addressLine2}</p>
        )}
      </InputWrapper>
      <InputWrapper label="Zip/Postal Code" required>
        <Input
          value={formData.zip}
          onChange={(e) => updateZip(e.target.value)}
        />
        {errors.zip && <p className="text-sm text-red-500">{errors.zip}</p>}
      </InputWrapper>
    </section>
  );
}
