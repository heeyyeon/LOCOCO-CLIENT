import { UseFormReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { Button } from '@lococo/design-system/button';

import { FormSection, TextFormField } from '../../../../../../components/forms';
import { type CreatorSignupForm } from '../utils/signup';

interface CommunityNameProps {
  form: UseFormReturn<CreatorSignupForm>;
  handleCheckAvailability: () => void;
}

export function CommunityName({
  form,
  handleCheckAvailability,
}: CommunityNameProps) {
  const t = useTranslations('creatorSignup.communityName');

  return (
    <FormSection title={t('title')} description={t('description')}>
      <TextFormField
        label={t('idLabel')}
        required
        placeholder={t('idPlaceholder')}
        register={form.register('id')}
        error={form.formState.errors.id?.message}
        rightContent={
          <Button
            type="button"
            variant="outline"
            color="primary"
            size="sm"
            rounded="sm"
            className="h-[3.7rem] px-[1.6rem]"
          >
            {t('checkAvailabilityButton')}
          </Button>
        }
        onRightContentClick={handleCheckAvailability}
      />
    </FormSection>
  );
}
