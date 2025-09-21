import { Campaign } from 'app/[locale]/(with-layout)/(home)/components/home-section-campaign';
import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';

interface CampaignGridProps {
  campaigns?: Campaign[];
}

export default function CampaignGrid({ campaigns }: CampaignGridProps) {
  return (
    <div>
      {campaigns ? (
        campaigns.length > 0 ? (
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
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[33.1rem] items-center justify-center">
            <div className="text-center">
              <p className="title1 font-[700] text-pink-500">
                No campaigns available
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="flex min-h-[33.1rem] items-center justify-center">
          <div className="text-center">
            <p className="title1 font-[700] text-pink-500">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
