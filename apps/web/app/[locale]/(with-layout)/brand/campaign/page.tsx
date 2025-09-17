import React from 'react';

import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';
import { campaignDummyData } from 'mocks/campaignData';

export default function BrandCampaign() {
  return (
    <main className="min-w-[120rem]">
      <h3>My Campaign</h3>
      <section className="grid grid-cols-3 gap-x-[4rem] gap-y-[3.2rem]">
        {campaignDummyData.map((campaign) => (
          <Card
            key={campaign.campaignId}
            dueDate={campaign.dueDate}
            chipVariant={
              campaign.userApplicationState
                ? campaign.userApplicationState
                : getChipVariantByDate(campaign.dueDate)
            }
            brand={campaign.brand}
            title={campaign.title}
            label={campaign.label}
            maxApplicants={campaign.maxApplicants}
            currentApplicants={campaign.currentApplicants}
            productThumbnailSrc={campaign.productThumbnailSrc}
            campaignId={campaign.campaignId}
            hoverOption="hover"
          />
        ))}{' '}
      </section>
    </main>
  );
}
