import React from 'react';

import { getTranslations } from 'next-intl/server';

import CardGridSection from './card-grid-section';

export default async function BrandCampaign() {
  const t = await getTranslations('brandMyPage');
  return (
    <main className="mx-auto w-full">
      <h3 className="title1 my-[1.6rem] w-full font-[700] text-gray-800">
        {t('myCampaign')}
      </h3>
      <CardGridSection />
    </main>
  );
}
