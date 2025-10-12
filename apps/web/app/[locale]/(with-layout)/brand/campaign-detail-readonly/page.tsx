import CampaignForm from '../create-campaign/component/campaign-form';

interface CampaignDetailReadonlyProps {
  searchParams: Promise<{ campaignId?: string }>;
}

export default async function CampaignDetailReadonly({
  searchParams,
}: CampaignDetailReadonlyProps) {
  const params = await searchParams;
  const campaignId = params.campaignId;

  return <CampaignForm campaignId={campaignId} isReadonly={true} />;
}
