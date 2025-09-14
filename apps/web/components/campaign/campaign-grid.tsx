import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';

interface Campaign {
  campaignId: number;
  dueDate: string;
  brand: string;
  title: string;
  label: string;
  maxApplicants: number;
  currentApplicants: number;
  productThumbnailSrc: string;
}

interface CampaignGridProps {
  campaigns: Campaign[];
}

export default function CampaignGrid({ campaigns }: CampaignGridProps) {
  return (
    <div className="grid grid-cols-3 gap-x-[2.4rem] gap-y-[3.2rem]">
      {campaigns.map((campaign) => (
        <Card
          key={campaign.campaignId}
          dueDate={campaign.dueDate}
          chipVariant={getChipVariantByDate(campaign.dueDate)}
          brand={campaign.brand}
          title={campaign.title}
          label={campaign.label}
          maxApplicants={campaign.maxApplicants}
          currentApplicants={campaign.currentApplicants}
          productThumbnailSrc={campaign.productThumbnailSrc}
          campaignId={campaign.campaignId}
        />
      ))}
    </div>
  );
}
