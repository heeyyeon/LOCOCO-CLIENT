import React from 'react';

import { useTranslations } from 'next-intl';

import Brand from './components/brand';
import Creators from './components/creators';
import FAQs from './components/fqas';

function HowItWork() {
  const t = useTranslations('howItWork');
  return (
    <div className="mx-auto flex w-[112.8rem] flex-col gap-[12rem] py-[6.4rem]">
      <p className="head1 font-bold text-pink-500">{t('title')}</p>
      <Creators />
      <Brand />
      <FAQs />
    </div>
  );
}

export default HowItWork;
