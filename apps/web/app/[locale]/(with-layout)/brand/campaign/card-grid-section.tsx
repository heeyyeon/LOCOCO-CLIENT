'use client';

import React from 'react';

import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';

import { useBrandCampaigns } from '../hooks/useBrandCampaign';

export default function CardGridSection() {
  const { data, isLoading, isError } = useBrandCampaigns();
  return (
    <section className="grid grid-cols-3 gap-x-[4rem] gap-y-[3.2rem]">
      {data?.data.campaigns.map((campaign) => (
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
