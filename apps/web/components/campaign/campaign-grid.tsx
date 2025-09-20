import { Campaign } from 'app/[locale]/(with-layout)/(home)/components/home-section-campaign';
import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';

interface CampaignGridProps {
  campaigns?: Campaign[];
}

export default function CampaignGrid({ campaigns }: CampaignGridProps) {
  return (
    <div className="grid grid-cols-3 gap-x-[2.4rem] gap-y-[3.2rem]">
      {campaigns?.map((campaign) => (
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
        />
      ))}
    </div>
  );
}
