'use client';

import React, { useState } from 'react';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import CampaignFilters from 'components/campaign/campaign-filter';
import CampaignGrid from 'components/campaign/campaign-grid';
import { useRouter } from 'i18n/navigation';
import { LanguageKey } from 'types/language';

import { Pagenation } from '@lococo/design-system/pagenation';

import { CategoryKey } from '../../../../../types/category';
import { getCampaignsByCategory } from '../apis';
import { campaignKeys } from '../query';
import { CampaignApiResponse } from './home-section-campaign';

export default function CampaignAll() {
  const [campaignCategory, setCampaignCategory] = useState<CategoryKey>('ALL');
  const [campaignLanguage, setCampaignLanguage] = useState<LanguageKey>('EN');

  const router = useRouter();
  const params = useParams();
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;

  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const serverPage = currentPage - 1;

  const handlePageChange = (page: number) => {
    router.push(`/all/${page}`);
  };

  const { data, isLoading } = useQuery<CampaignApiResponse>({
    queryKey: [
      campaignKeys.byCategoryPaginated(
        campaignCategory,
        'popular',
        campaignLanguage,
        serverPage,
        12
      ),
    ],
    queryFn: () =>
      getCampaignsByCategory({
        section: 'KBeauty',
        category: campaignCategory,
        page: serverPage,
        size: 12,
        locale: campaignLanguage,
      }),
  });

  const campaigns = data?.data?.campaigns || [];

  const totalPages = data?.data?.pageInfo
    ? Math.ceil((data.data.pageInfo.numberOfElements || 0) / 12)
    : 1;

  return (
    <div className="flex w-full flex-col gap-[1.6rem]">
      <CampaignFilters
        campaignCategory={campaignCategory}
        setCampaignCategory={setCampaignCategory}
        campaignLanguage={campaignLanguage}
        setCampaignLanguage={setCampaignLanguage}
        showSeeMore={false}
      />
      <CampaignGrid campaigns={campaigns} isLoading={isLoading} />
      <div className="mb-[6.4rem] mt-[4.8rem] flex w-full items-center justify-center">
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
