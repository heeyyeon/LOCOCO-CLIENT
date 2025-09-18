import { UseFormReturn } from 'react-hook-form';

import {
  CommunityName,
  HomeAddress,
  PersonalDetails,
  SkinInfo,
} from '../../app/[locale]/(with-layout)/sign-up/creator/components';
import { type CreatorSignupForm } from '../../app/[locale]/(with-layout)/sign-up/creator/hooks/signup';

interface CreatorFormSectionsProps {
  form: UseFormReturn<CreatorSignupForm>;
  locale: string;
  onCheckAvailability: () => void;
}

export function CreatorFormSections({
  form,
  locale,
  onCheckAvailability,
}: CreatorFormSectionsProps) {
  return (
    <>
      <CommunityName
        form={form}
        handleCheckAvailability={onCheckAvailability}
      />

      <PersonalDetails form={form} />

      <HomeAddress form={form} locale={locale} />

      <SkinInfo form={form} />
    </>
  );
}
