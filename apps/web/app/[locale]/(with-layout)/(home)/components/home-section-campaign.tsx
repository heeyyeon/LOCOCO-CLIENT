'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import CampaignFilters from 'components/campaign/campaign-filter';
import CampaignGrid from 'components/campaign/campaign-grid';
import { LanguageKey } from 'types/language';
import { CategoryKey } from 'types/tab-category';

import { getCampaignsByCategory } from '../apis';
import { campaignKeys } from '../query';

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
  const [campaignCategory, setCampaignCategory] = useState<CategoryKey>('ALL');
  const [campaignLanguage, setCampaignLanguage] = useState<LanguageKey>('EN');

  const { data, isLoading } = useQuery<CampaignApiResponse>({
    queryKey: [
      campaignKeys.byCategory(campaignCategory, kindOfCard, campaignLanguage),
    ],
    queryFn: async () =>
      await getCampaignsByCategory({
        section: kindOfCard,
        category: campaignCategory,
        page: 0,
        size: 6,
        locale: campaignLanguage,
      }),
  });

  console.log(data?.data?.campaigns);

  const campaigns = isLoading
    ? undefined
    : data?.data?.campaigns?.slice(0, 6) || [];

  return (
    <div className="flex w-full flex-col gap-[1.6rem]">
      <CampaignFilters
        campaignCategory={campaignCategory}
        setCampaignCategory={setCampaignCategory}
        campaignLanguage={campaignLanguage}
        setCampaignLanguage={setCampaignLanguage}
        showSeeMore={seeMore}
      />
      <CampaignGrid campaigns={campaigns} isLoading={isLoading} />
    </div>
  );
}
