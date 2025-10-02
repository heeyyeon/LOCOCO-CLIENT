'use client';

import CampaignFilters from 'components/campaign/campaign-filter';
import CampaignGrid from 'components/campaign/campaign-grid';

import { useHomeCampaigns } from '../hooks/useCampaign';

interface HomeSectionCampaignProps {
  kindOfCard: 'KBeauty' | 'openingSoon';
  seeMore?: boolean;
}

export interface CampaignApiResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    campaigns: Campaign[];
    pageInfo: PageInfo;
  };
}

interface PageInfo {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  isLast: boolean;
}

export interface Campaign {
  campaignId: number;
  campaignType: string;
  language: string;
  brandName: string;
  campaignImageUrl: string;
  campaignName: string;
  applicantNumber: number;
  recruitmentNumber: number;
  endTime: string;
  chipStatus: 'disabled' | 'default' | 'approved' | 'declined' | 'progress';
}

export default function HomeSectionCampaign({
  kindOfCard,
  seeMore = false,
}: HomeSectionCampaignProps) {
  const {
    isLoading,
    campaignCategory,
    setCampaignCategory,
    campaignLanguage,
    setCampaignLanguage,
    campaigns,
  } = useHomeCampaigns(kindOfCard);

  return (
    <div className="flex w-full flex-col gap-[1.6rem]">
      <CampaignFilters
        campaignCategory={campaignCategory}
        setCampaignCategory={setCampaignCategory}
        campaignLanguage={campaignLanguage}
        setCampaignLanguage={setCampaignLanguage}
        showSeeMore={seeMore}
      />
      <CampaignGrid
        campaigns={campaigns}
        isLoading={isLoading}
        kindOfCard={kindOfCard}
      />
    </div>
  );
}
