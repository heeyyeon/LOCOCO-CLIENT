import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { Button } from '@lococo/design-system/button';

import { FormSection, TextFormField } from '../../../../../../components/forms';
import { checkIdAvailability } from '../apis/duplicate-check';
import { type CreatorSignupForm } from '../utils/signup';

interface CommunityNameProps {
  form: UseFormReturn<CreatorSignupForm>;
}

export function CommunityName({ form }: CommunityNameProps) {
  const t = useTranslations('creatorSignup.communityName');

  const [availabilityMessage, setAvailabilityMessage] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleCheckAvailability = async () => {
    const isValid = await form.trigger('id');
    if (!isValid) {
      return;
    }

    const id = form.getValues('id');

    try {
      const result = await checkIdAvailability(id);

      setAvailabilityMessage({
        type: result.success ? 'success' : 'error',
        message: result.success ? t('idAvailable') : t('idTaken'),
      });
    } catch {
      setAvailabilityMessage({
        type: 'error',
        message: t('idTaken'),
      });
    }
  };

  return (
    <FormSection title={t('title')} description={t('description')}>
      <TextFormField
        label={t('idLabel')}
        required
        placeholder={t('idPlaceholder')}
        register={form.register('id')}
        error={
          form.formState.errors.id?.message ||
          (availabilityMessage?.type === 'error'
            ? availabilityMessage.message
            : undefined)
        }
        successMessage={
          availabilityMessage?.type === 'success'
            ? availabilityMessage.message
            : undefined
        }
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
