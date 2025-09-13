'use client';

import React, { useState } from 'react';

import Card from 'components/card/Card';
import { getChipVariantByDate } from 'components/card/utils/getChipVariantByDate';
import { campaignDummyData } from 'mocks/campaignData';

import { Tab, TabContainer } from '@lococo/design-system/tab';

import { CATEGORY_VALUES, CategoryValue } from '../../../../../types/category';
import CampaignLanguage, { LocaleType } from './campaign-language';

export default function HomeSectionAllCampaign() {
  const [campaignCategory, setCampaignCategory] =
    useState<CategoryValue>('ALL');

  const [campaignLanguage, setCampaignLanguage] = useState<LocaleType>('en');

  return (
    <div className="flex w-full flex-col gap-[1.6rem]">
      <div className="flex h-[5.6rem] w-full items-center justify-between">
        <TabContainer variant="horizontal">
          {CATEGORY_VALUES.map((CATEGORY_VALUE) => (
            <Tab
              key={CATEGORY_VALUE}
              label={CATEGORY_VALUE}
              value={CATEGORY_VALUE}
              selected={campaignCategory === CATEGORY_VALUE}
              onClick={() => setCampaignCategory(CATEGORY_VALUE)}
            />
          ))}
        </TabContainer>
        <div className="flex items-center">
          <CampaignLanguage
            locale={campaignLanguage}
            setLocale={setCampaignLanguage}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-[2.4rem] gap-y-[3.2rem]">
        {campaignDummyData.map((campaign) => (
          <Card
            key={campaign.campaignId}
            dueDate={campaign.dueDate}
            chipVariant={getChipVariantByDate(campaign.dueDate)}
            brand={campaign.brand}
            title={campaign.title}
            label={campaign.label}
            maxApplicants={campaign.maxApplicants}
            currentApplicants={campaign.currentApplicants}
            productThumbnailSrc={campaign.productThumbnailSrc}
            campaignId={campaign.campaignId}
          />
        ))}
      </div>
    </div>
  );
}
