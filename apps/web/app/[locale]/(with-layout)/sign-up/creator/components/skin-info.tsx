import { UseFormReturn } from 'react-hook-form';

import {
  FormSection,
  SelectFormField,
} from '../../../../../../components/forms';
import {
  SKIN_TONE,
  SKIN_TYPES,
} from '../../../../../../constants/creator-options';
import { type CreatorSignupForm } from '../hooks/signup';

interface SkinInfoProps {
  form: UseFormReturn<CreatorSignupForm>;
}

export function SkinInfo({ form }: SkinInfoProps) {
  const SKIN_TONES = SKIN_TONE.map((tone) => ({
    label: tone.label,
    value: tone.value,
    icon: (
      <div
        className="h-[2.4rem] w-[2.4rem] rounded-full"
        style={{ backgroundColor: tone.color }}
      />
    ),
  }));

  return (
    <div className="mt-[4.8rem]">
      <FormSection
        title="Additional Information"
        description="Tell us about you more!"
      >
        <div className="space-y-[1.6rem]">
          <SelectFormField
            label="Skin Type"
            required
            variant="reverse"
            placeholder="Skin Type"
            options={SKIN_TYPES}
            onValueChange={(value) =>
              form.setValue('skinType', value, { shouldValidate: true })
            }
            error={form.formState.errors.skinType?.message}
          />

          <SelectFormField
            label="Skin Tone"
            variant="reverse"
            required
            placeholder="Skin Tone"
            options={SKIN_TONES}
            onValueChange={(value) =>
              form.setValue('skinTone', value, { shouldValidate: true })
            }
            error={form.formState.errors.skinTone?.message}
          />
        </div>
      </FormSection>
    </div>
  );
}
