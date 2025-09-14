'use client';

import React, { useState } from 'react';

import CampaignFilters from 'components/campaign/campaign-filter';
import CampaignGrid from 'components/campaign/campaign-grid';
import { campaignDummyData } from 'mocks/campaignData';

import { CategoryValue } from '../../../../../types/category';
import { LocaleType } from './campaign-language';

export default function CampaignAll() {
  const [campaignCategory, setCampaignCategory] =
    useState<CategoryValue>('ALL');

  const [campaignLanguage, setCampaignLanguage] = useState<LocaleType>('en');

  // TODO API 응답 필드 보고 카테고리 필터 추가 후 렌더링

  return (
    <div className="flex w-full flex-col gap-[1.6rem]">
      <CampaignFilters
        campaignCategory={campaignCategory}
        setCampaignCategory={setCampaignCategory}
        campaignLanguage={campaignLanguage}
        setCampaignLanguage={setCampaignLanguage}
        showSeeMore={false}
      />
      <CampaignGrid campaigns={campaignDummyData} />
    </div>
  );
}
