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
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.6rem]">
        <p className="inter-title2 text-gray-800">Skin</p>
        <p className="inter-caption3 text-gray-500">Tell us about you more!</p>
      </div>
      <InputWrapper label="Skin Type" required>
        <Select
          options={[
            { label: 'Normal' },
            { label: 'Dry' },
            { label: 'Oily' },
            { label: 'Combination' },
            { label: 'Sensitive' },
            { label: 'Others' },
          ]}
          onValueChange={(value) => updateSkinType(value)}
          placeholder="Skin Type"
          value={formData.skinType}
          isError={errors.skinType}
          errorText={errors.skinType}
        />
      </InputWrapper>
      <InputWrapper label="Skin Tone" required>
        <Select
          options={[
            { label: 'Shade 1' },
            { label: 'Shade 2' },
            { label: 'Shade 3' },
            { label: 'Shade 4' },
            { label: 'Shade 5' },
            { label: 'Shade 6' },
            { label: 'Shade 7' },
            { label: 'Shade 8' },
            { label: 'Shade 9' },
            { label: 'Shade 10' },
            { label: 'Shade 11' },
            { label: 'Shade 12' },
            { label: 'Shade 13' },
            { label: 'Shade 14' },
            { label: 'Shade 15' },
            { label: 'Shade 16' },
            { label: 'Shade 17' },
            { label: 'Shade 18' },
            { label: 'Shade 19' },
            { label: 'Shade 20' },
          ]}
          onValueChange={(value) => updateSkinTone(value)}
          placeholder="Skin Tone"
          value={formData.skinTone}
          isError={errors.skinTone}
          errorText={errors.skinTone}
        />
      </InputWrapper>
    </section>
  );
}
