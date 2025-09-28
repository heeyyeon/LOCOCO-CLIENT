'use client';

import React from 'react';

import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';
import CampaignListEmpty from 'components/empty/campgin-list-empty';

import { useBrandCampaigns } from '../hooks/useBrandCampaign';

export default function CardGridSection() {
  const { data, isLoading, isError } = useBrandCampaigns();

  if (isLoading) {
    return <CampaignListEmpty emptyMessage="캠페인을 불러오는 중입니다." />;
  }

  if (isError) {
    return (
      <CampaignListEmpty emptyMessage="캠페인을 불러오는데 실패했습니다." />
    );
  }

  if (!data?.data?.campaigns || data.data.campaigns.length === 0) {
    return <CampaignListEmpty emptyMessage="등록된 캠페인이 없습니다." />;
  }

  return (
    <section className="grid grid-cols-3 gap-x-[4rem] gap-y-[3.2rem]">
      {data.data.campaigns.map((campaign) => (
        <Card
          key={campaign.id}
          endTime={campaign.applyDeadline}
          chipVariant={
            campaign.campaignStatus
              ? campaign.campaignStatus
              : getChipVariantByDate(campaign.applyDeadline)
          }
          brandName={campaign.applyDeadline}
          campaignName={campaign.title}
          recruitmentNumber={campaign.recruitmentNumber}
          applicantNumber={campaign.applicantNumber}
          campaignImageUrl={campaign.campaignImageUrl}
          campaignId={campaign.id}
          hoverOption="always"
          className="w-[28.4rem]"
        />
      ))}
    </section>
  );
}
