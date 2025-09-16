import { useTranslations } from 'next-intl';

import { Select } from '@lococo/design-system/select';

import type { ProfileFormData } from '../../hooks/useProfile';
import InputWrapper from '../input-wrapper';

interface SkinProps {
  formData: ProfileFormData;
  errors: any;
  updateSkinType: (value: string) => void;
  updateSkinTone: (value: string) => void;
}

export default function Skin({
  formData,
  errors,
  updateSkinType,
  updateSkinTone,
}: SkinProps) {
  const t = useTranslations('myPage.editProfile.skin');
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.6rem]">
        <p className="inter-title2 text-gray-800">{t('title')}</p>
        <p className="inter-caption3 text-gray-500">{t('description')}</p>
      </div>
      <InputWrapper label={t('skinType')} required>
        <Select
          options={[
            { label: t('skinTypeOptions.normal') },
            { label: t('skinTypeOptions.dry') },
            { label: t('skinTypeOptions.oily') },
            { label: t('skinTypeOptions.combination') },
            { label: t('skinTypeOptions.sensitive') },
            { label: t('skinTypeOptions.others') },
          ]}
          onValueChange={(value) => updateSkinType(value)}
          placeholder={t('skinType')}
          value={formData.skinType}
          isError={errors.skinType}
          errorText={errors.skinType}
        />
      </InputWrapper>
      <InputWrapper label={t('skinTone')} required>
        <Select
          options={[
            { label: t('skinToneOptions.shade1') },
            { label: t('skinToneOptions.shade2') },
            { label: t('skinToneOptions.shade3') },
            { label: t('skinToneOptions.shade4') },
            { label: t('skinToneOptions.shade5') },
            { label: t('skinToneOptions.shade6') },
            { label: t('skinToneOptions.shade7') },
            { label: t('skinToneOptions.shade8') },
            { label: t('skinToneOptions.shade9') },
            { label: t('skinToneOptions.shade10') },
            { label: t('skinToneOptions.shade11') },
            { label: t('skinToneOptions.shade12') },
            { label: t('skinToneOptions.shade13') },
            { label: t('skinToneOptions.shade14') },
            { label: t('skinToneOptions.shade15') },
            { label: t('skinToneOptions.shade16') },
            { label: t('skinToneOptions.shade17') },
            { label: t('skinToneOptions.shade18') },
            { label: t('skinToneOptions.shade19') },
            { label: t('skinToneOptions.shade20') },
          ]}
          onValueChange={(value) => updateSkinTone(value)}
          placeholder={t('skinTone')}
          value={formData.skinTone}
          isError={errors.skinTone}
          errorText={errors.skinTone}
        />
      </InputWrapper>
    </section>
  );
}
