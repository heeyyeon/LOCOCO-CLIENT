import { UseFormReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

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
  const t = useTranslations('creatorSignup.skinInfo');
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
      <FormSection title={t('title')} description={t('description')}>
        <div className="space-y-[1.6rem]">
          <SelectFormField
            label={t('skinTypeLabel')}
            required
            variant="reverse"
            placeholder={t('skinTypePlaceholder')}
            options={SKIN_TYPES}
            onValueChange={(value) =>
              form.setValue('skinType', value, { shouldValidate: true })
            }
            error={form.formState.errors.skinType?.message}
          />

          <SelectFormField
            label={t('skinToneLabel')}
            variant="reverse"
            required
            placeholder={t('skinTonePlaceholder')}
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
