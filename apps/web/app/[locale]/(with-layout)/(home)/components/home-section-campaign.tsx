'use client';

import { useState } from 'react';

import { CATEGORY_VALUES, CategoryValue } from 'types/category';

import { Tab, TabContainer } from '@lococo/design-system/tab';

import CampaignLanguage, { LocaleType } from './campaign-language';

export default function HomeSectionCampaign() {
  const [campaignCategory, setCampaignCategory] =
    useState<CategoryValue>('ALL');

  const [campaignLanguage, setCampaignLanguage] = useState<LocaleType>('en');
  return (
    <div className="flex w-full flex-col gap-[0.6rem]">
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
        <div>
          <CampaignLanguage
            locale={campaignLanguage}
            setLocale={setCampaignLanguage}
          />
        </div>
      </div>
      {/* TODO Card Map */}
    </div>
  );
}
