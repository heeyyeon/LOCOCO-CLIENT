import { UseFormReturn } from 'react-hook-form';

import { Button } from '@lococo/design-system/button';

import { FormSection, TextFormField } from '../../../../../../components/forms';
import { type CreatorSignupForm } from '../hooks/signup';

interface CommunityNameProps {
  form: UseFormReturn<CreatorSignupForm>;
  handleCheckAvailability: () => void;
}

export function CommunityName({
  form,
  handleCheckAvailability,
}: CommunityNameProps) {
  return (
    <FormSection
      title="Community Name"
      description="(ID must be between 1 and 15 characters long and can only contain letters, numbers, periods (.), and underscores (_))."
    >
      <TextFormField
        label="ID"
        required
        placeholder="ex: ilovelococo"
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
            Check availability
          </Button>
        }
        onRightContentClick={handleCheckAvailability}
      />
    </FormSection>
  );
}
