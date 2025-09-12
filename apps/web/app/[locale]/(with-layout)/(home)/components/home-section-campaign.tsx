import { useState } from 'react';

import { CATEGORY_VALUES, CategoryValue } from 'types/category';

import { Tab, TabContainer } from '@lococo/design-system/tab';

export default function HomeSectionCampaign() {
  const [campaignCategory, setCampaignCategory] =
    useState<CategoryValue>('ALL');
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-[5.6rem] w-full items-center justify-between">
        <TabContainer>
          {CATEGORY_VALUES.map((CATEGORY_VALUE) => (
            <Tab
              key={CATEGORY_VALUE}
              label={CATEGORY_VALUE}
              onClick={() => setCampaignCategory(CATEGORY_VALUE)}
              active={campaignCategory === CATEGORY_VALUE}
            ></Tab>
          ))}
        </TabContainer>
        <div>더보기</div>
      </div>
      {/* TODO Card Map */}
    </div>
  );
}
