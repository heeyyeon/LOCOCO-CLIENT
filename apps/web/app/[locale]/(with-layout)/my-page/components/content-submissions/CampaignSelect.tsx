import { useTranslations } from 'next-intl';

import { Select } from '@lococo/design-system/select';

import { ContentSubmissionsFormData } from '../../hooks/useContentSubmissions';

interface CampaignSelectProps {
  formData: ContentSubmissionsFormData;
  errors: { campaign: string };
  updateCampaign: (campaign: string) => void;
}

export default function CampaignSelect({
  formData,
  errors,
  updateCampaign,
}: CampaignSelectProps) {
  const t = useTranslations('myPage.contentSubmissions.campaignSelect');
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <p className="title2 text-gray-800">{t('title')}</p>
      <Select
        options={[]}
        onValueChange={(value) => updateCampaign(value)}
        placeholder={t('selectCampaign')}
        value={formData.campaign}
        isError={!!errors.campaign}
        errorText={errors.campaign}
      />
    </section>
  );
}
