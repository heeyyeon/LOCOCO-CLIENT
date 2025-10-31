import { useTranslations } from 'next-intl';

import { Select } from '@lococo/design-system/select';

import { ContentSubmissionsFormData } from '../../types/content-submissions';

interface CampaignSelectProps {
  formData: ContentSubmissionsFormData;
  errors: string | undefined;
  updateCampaign: (fieldId: string, campaign: string) => void;
  index: number;
  fieldId: string;
}

export default function CampaignSelect({
  formData,
  errors,
  updateCampaign,
  index,
  fieldId,
}: CampaignSelectProps) {
  const t = useTranslations('myPage.contentSubmissions.campaignSelect');
  const content = useTranslations('myPage.contentSubmissions.content');

  const getContentTitle = () => {
    if (index === 0) return content('1stContent');
    if (index === 1) return content('2ndContent');
    return content(`${index + 1}stContent`);
  };

  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <p className="title2 text-gray-800">
        {getContentTitle()}: {t('title')}
      </p>
      <Select
        options={[
          {
            label: formData.campaign,
          },
        ]}
        onValueChange={(value) => updateCampaign(fieldId, value)}
        placeholder={t('selectCampaign')}
        value={formData.campaign}
        isError={!!errors}
        errorText={errors}
      />
    </section>
  );
}
