'use client';

import React from 'react';

import CampaignFilters from 'components/campaign/campaign-filter';
import CampaignGrid from 'components/campaign/campaign-grid';

import { Pagenation } from '@lococo/design-system/pagenation';

import { useCampaignsPaginated } from '../hooks/useCampain';

export default function CampaignAll() {
  const {
    campaignCategory,
    setCampaignCategory,
    campaignLanguage,
    setCampaignLanguage,
    campaigns,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
  } = useCampaignsPaginated();

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
