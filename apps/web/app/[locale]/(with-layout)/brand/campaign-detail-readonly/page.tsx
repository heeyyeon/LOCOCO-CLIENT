import CampaignForm from '../create-campaign/component/campaign-form';

interface CampaignDetailReadonlyProps {
  searchParams: { campaignId?: string };
}

export default function CampaignDetailReadonly({
  searchParams,
}: CampaignDetailReadonlyProps) {
  const campaignId = searchParams.campaignId;

  return <CampaignForm campaignId={campaignId} isReadonly={true} />;
}
