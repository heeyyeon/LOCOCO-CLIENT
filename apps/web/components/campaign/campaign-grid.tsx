import { Campaign } from 'app/[locale]/(with-layout)/(home)/components/home-section-campaign';
import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';
import CampaignListEmpty from 'components/empty/campgin-list-empty';

interface CampaignGridProps {
  campaigns?: Campaign[];
  isLoading?: boolean;
}

export default function CampaignGrid({
  campaigns,
  isLoading,
}: CampaignGridProps) {
  if (isLoading) {
    return <CampaignListEmpty emptyMessage="Loading..." />;
  }

  if (!campaigns || campaigns.length === 0) {
    return <CampaignListEmpty emptyMessage="No campaigns available" />;
  }

  return (
    <div className="grid min-h-[33.1rem] grid-cols-3 gap-x-[2.4rem] gap-y-[3.2rem]">
      {campaigns.map((campaign) => (
        <Card
          key={campaign.campaignId}
          endTime={campaign.endTime}
          chipVariant={
            campaign.chipStatus
              ? campaign.chipStatus
              : getChipVariantByDate(campaign.endTime)
          }
          brandName={campaign.brandName}
          campaignName={campaign.campaignName}
          campaignType={campaign.campaignType}
          recruitmentNumber={campaign.recruitmentNumber}
          applicantNumber={campaign.applicantNumber}
          campaignImageUrl={campaign.campaignImageUrl}
          campaignId={campaign.campaignId}
          hoverOption="hover"
        />
      ))}
    </div>
  );
}
