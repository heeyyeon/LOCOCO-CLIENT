'use client';

import React from 'react';

import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';
import CampaignListEmpty from 'components/empty/campgin-list-empty';

import { useBrandCampaigns } from '../hooks/useBrandCampaign';

type ChipVariant =
  | 'ALL'
  | 'DRAFT'
  | 'WAITING_APPROVAL'
  | 'OPEN_RESERVED'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'progress'
  | 'default'
  | 'disabled'
  | 'approved'
  | 'declined';

const isValidChipVariant = (status: string): status is ChipVariant => {
  const validStatuses: ChipVariant[] = [
    'ALL',
    'DRAFT',
    'WAITING_APPROVAL',
    'OPEN_RESERVED',
    'ACTIVE',
    'COMPLETED',
    'progress',
    'default',
    'disabled',
    'approved',
    'declined',
  ];
  return validStatuses.includes(status as ChipVariant);
};

export default function CardGridSection() {
  const { data, isLoading, isError } = useBrandCampaigns();

  if (isLoading) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <CampaignListEmpty emptyMessage="캠페인을 불러오는 중입니다." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <CampaignListEmpty emptyMessage="캠페인을 불러오는데 실패했습니다." />
      </div>
    );
  }

  if (!data?.data?.campaigns || data.data.campaigns.length === 0) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <CampaignListEmpty emptyMessage="등록된 캠페인이 없습니다." />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-3 gap-x-[4rem] gap-y-[3.2rem]">
      {data.data.campaigns.map((campaign) => {
        const chipVariant = isValidChipVariant(campaign.campaignStatus)
          ? campaign.campaignStatus
          : getChipVariantByDate(campaign.applyDeadline);

        return (
          <Card
            key={campaign.id}
            endTime={campaign.applyDeadline}
            chipVariant={chipVariant}
            brandName={campaign.applyDeadline}
            campaignName={campaign.title}
            recruitmentNumber={campaign.recruitmentNumber}
            applicantNumber={campaign.applicantNumber}
            campaignImageUrl={campaign.campaignImageUrl}
            campaignId={campaign.id}
            hoverOption="always"
            className="w-[28.4rem]"
          />
        );
      })}
    </section>
  );
}
