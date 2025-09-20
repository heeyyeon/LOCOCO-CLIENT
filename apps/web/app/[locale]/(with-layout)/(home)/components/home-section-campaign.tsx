'use client';

import { useState } from 'react';

import { useLocale } from 'next-intl';

import { useQuery } from '@tanstack/react-query';
import CampaignFilters from 'components/campaign/campaign-filter';
import CampaignGrid from 'components/campaign/campaign-grid';
import { campaignDummyData } from 'mocks/campaignData';
import { CategoryValue } from 'types/category';

import { getCampaignsByCategory } from '../apis';
import { campaignKeys } from '../query';
import { LocaleType } from './campaign-language';

interface HomeSectionCampaignProps {
  kindOfCard: 'KBeauty' | 'openingSoon';
  seeMore?: boolean;
}

export default function HomeSectionCampaign({
  kindOfCard,
  seeMore = false,
}: HomeSectionCampaignProps) {
  const [campaignCategory, setCampaignCategory] =
    useState<CategoryValue>('ALL');
  const [campaignLanguage, setCampaignLanguage] = useState<LocaleType>('en');

  const locale = useLocale();

  const { data } = useQuery({
    queryKey: [campaignKeys.byCategory(campaignCategory, kindOfCard, locale)],
    queryFn: () =>
      getCampaignsByCategory({
        section: kindOfCard,
        category: campaignCategory,
        page: 0,
        size: 6,
        locale,
      }),
  });

  console.log(data);

  // TODO kindOfCard로 api 호출 -> 위의 훅들 기반으로 호출하고 인자로 size 넘겨주기(여기선 6) + API 응답 필드 보고 카테고리 필터 추가
  const campaigns = campaignDummyData?.slice(0, 6) || [];

  return (
    <div className="flex w-full flex-col gap-[1.6rem]">
      <CampaignFilters
        campaignCategory={campaignCategory}
        setCampaignCategory={setCampaignCategory}
        campaignLanguage={campaignLanguage}
        setCampaignLanguage={setCampaignLanguage}
        showSeeMore={seeMore}
      />
      <CampaignGrid campaigns={campaigns} />
    </div>
  );
}
