import React from 'react';

import { getTranslations } from 'next-intl/server';

import { getBrandMyCampaign } from '../api';
import CardGridSection from './card-grid-section';

export default async function BrandCampaign() {
  const t = await getTranslations('brandMyPage');
  const response = await getBrandMyCampaign({});

  console.log(response);
  return (
    <main>
      <h3 className="title1 my-[1.6rem] font-[700] text-gray-800">
        {t('myCampaign')}
      </h3>
      <CardGridSection />
    </main>
  );
}
