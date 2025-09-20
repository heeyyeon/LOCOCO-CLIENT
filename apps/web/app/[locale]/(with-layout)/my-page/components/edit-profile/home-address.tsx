import { useTranslations } from 'next-intl';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input-field';
import { Select } from '@lococo/design-system/select';

import type { ProfileFormData } from '../../hooks/use-profile';
import InputWrapper from '../input-wrapper';

interface HomeAddressProps {
  formData: ProfileFormData;
  errors: {
    country?: string;
    state?: string;
    city?: string;
    addressLine1?: string;
    addressLine2?: string;
    zip?: string;
  };
  updateCountry: (value: string) => void;
  updateState: (value: string) => void;
  updateCity: (value: string) => void;
  updateAddressLine1: (value: string) => void;
  updateAddressLine2: (value: string) => void;
  updateZip: (value: string) => void;
}

export default function HomeAddress({
  formData,
  errors,
  updateCountry,
  updateState,
  updateCity,
  updateAddressLine1,
  updateAddressLine2,
  updateZip,
}: HomeAddressProps) {
  const t = useTranslations('myPage.editProfile.homeAddress');
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[1.6rem]">
        <p className="title2 text-gray-800">{t('title')}</p>
        <p className="caption3 text-gray-500">{t('description')}</p>
      </div>
      <InputWrapper
        label={t('country')}
        required
        notice={errors.country && <ErrorNotice message={errors.country} />}
      >
        {
          //TODO: 국가 목록 추가
        }
        <Select
          options={[{ label: 'United States' }, { label: 'Canada' }]}
          onValueChange={(value) => updateCountry(value)}
          placeholder={t('country')}
          value={formData.country}
        />
      </InputWrapper>
      <InputWrapper
        label={t('state')}
        required
        notice={errors.state && <ErrorNotice message={errors.state} />}
      >
        <Input
          value={formData.state}
          onChange={(e) => updateState(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper
        label={t('city')}
        required
        notice={errors.city && <ErrorNotice message={errors.city} />}
      >
        <Input
          value={formData.city}
          onChange={(e) => updateCity(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper
        label={t('addressLine1')}
        required
        notice={
          errors.addressLine1 && <ErrorNotice message={errors.addressLine1} />
        }
      >
        <Input
          value={formData.addressLine1}
          onChange={(e) => updateAddressLine1(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper
        label={t('addressLine2')}
        notice={
          errors.addressLine2 && <ErrorNotice message={errors.addressLine2} />
        }
      >
        <Input
          value={formData.addressLine2}
          onChange={(e) => updateAddressLine2(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper
        label={t('zip')}
        notice={errors.zip && <ErrorNotice message={errors.zip} />}
      >
        <Input
          value={formData.zip}
          onChange={(e) => updateZip(e.target.value)}
        />
      </InputWrapper>
    </section>
  );
}
