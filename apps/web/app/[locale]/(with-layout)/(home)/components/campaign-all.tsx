'use client';

import React, { useState } from 'react';

import { useParams } from 'next/navigation';

import CampaignFilters from 'components/campaign/campaign-filter';
import CampaignGrid from 'components/campaign/campaign-grid';
import { useRouter } from 'i18n/navigation';
import { campaignDummyData } from 'mocks/campaignData';

import { Pagenation } from '@lococo/design-system/pagenation';

import { CategoryValue } from '../../../../../types/category';
import { LocaleType } from './campaign-language';

export default function CampaignAll() {
  const [campaignCategory, setCampaignCategory] =
    useState<CategoryValue>('ALL');

  const router = useRouter();
  const params = useParams();
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const [campaignLanguage, setCampaignLanguage] = useState<LocaleType>('en');

  const handlePageChange = (page: number) => {
    router.push(`/all/${page}`);
  };

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
      <div className="mb-[6.4rem] mt-[4.8rem] flex w-full items-center justify-center">
        <Pagenation
          currentPage={currentPage}
          totalPages={20}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
