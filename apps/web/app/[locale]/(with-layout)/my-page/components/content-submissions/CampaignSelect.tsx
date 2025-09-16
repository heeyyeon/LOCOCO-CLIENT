import { Select } from '@lococo/design-system/select';

import { ContentSubmissionsFormData } from '../../types/contentSubmissions';

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
  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <p className="inter-title2 text-gray-800">Select a Campaign</p>
      <Select
        options={[{ label: 'Campaign' }]}
        onValueChange={(value) => updateCampaign(value)}
        placeholder="Select a Campaign"
        value={formData.campaign}
        isError={!!errors.campaign}
        errorText={errors.campaign}
      />
    </section>
  );
}
