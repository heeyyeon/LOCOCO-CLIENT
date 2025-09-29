import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { Button } from '@lococo/design-system/button';

import { FormSection, TextFormField } from '../../../../../../components/forms';
import { useIdAvailability } from '../../queries/useIdAvailability';
import { type CreatorSignupForm } from '../utils/signup';

interface CommunityNameProps {
  form: UseFormReturn<CreatorSignupForm>;
  onIdCheckResult?: (checked: boolean, available: boolean) => void;
}

export function CommunityName({ form, onIdCheckResult }: CommunityNameProps) {
  const t = useTranslations('creatorSignup.communityName');
  const [isCheckingEnabled, setIsCheckingEnabled] = useState(false);
  const [hasCheckedCurrentId, setHasCheckedCurrentId] = useState(false);

  const id = form.watch('id');

  const { data: availabilityResult } = useIdAvailability(
    id || '',
    isCheckingEnabled
  );

  useEffect(() => {
    setHasCheckedCurrentId(false);
    setIsCheckingEnabled(false);
    onIdCheckResult?.(false, false);
  }, [id, onIdCheckResult]);

  useEffect(() => {
    if (availabilityResult && hasCheckedCurrentId) {
      onIdCheckResult?.(true, availabilityResult.success);
      setIsCheckingEnabled(false);
    }
  }, [availabilityResult, hasCheckedCurrentId, onIdCheckResult]);

  const handleCheckAvailability = async () => {
    const isValid = await form.trigger('id');
    if (!isValid) {
      return;
    }

    setIsCheckingEnabled(true);
    setHasCheckedCurrentId(true);
  };

  const getMessage = () => {
    if (form.formState.errors.id?.message) {
      return {
        type: 'error' as const,
        message: form.formState.errors.id.message,
      };
    }

    if (hasCheckedCurrentId && availabilityResult) {
      return {
        type: availabilityResult.success
          ? ('success' as const)
          : ('error' as const),
        message: availabilityResult.success ? t('idAvailable') : t('idTaken'),
      };
    }

    return null;
  };

  const message = getMessage();

  return (
    <FormSection title={t('title')} description={t('description')}>
      <TextFormField
        label={t('idLabel')}
        required
        placeholder={t('idPlaceholder')}
        register={form.register('id')}
        error={message?.type === 'error' ? message.message : undefined}
        successMessage={
          message?.type === 'success' ? message.message : undefined
        }
        rightContent={
          <Button
            type="button"
            variant="outline"
            color="primary"
            size="sm"
            rounded="sm"
            className="h-[3.7rem] px-[1.6rem]"
            onClick={handleCheckAvailability}
          >
            {t('checkAvailabilityButton')}
          </Button>
        }
        onRightContentClick={() => {
          handleCheckAvailability();
          setIsAvailable(true);
        }}
      />
    </FormSection>
  );
}
