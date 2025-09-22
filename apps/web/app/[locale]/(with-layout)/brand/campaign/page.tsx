import React from 'react';

import { getTranslations } from 'next-intl/server';

import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';
import { campaignDummyData } from 'mocks/campaignData';

export default async function BrandCampaign() {
  const t = await getTranslations('brandMyPage');
  return (
    <main>
      <h3 className="title1 my-[1.6rem] font-[700] text-gray-800">
        {t('myCampaign')}
      </h3>
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
            hoverOption="always"
            className="w-[28.4rem]"
          />
        ))}
      </section>
    </main>
  );
}
