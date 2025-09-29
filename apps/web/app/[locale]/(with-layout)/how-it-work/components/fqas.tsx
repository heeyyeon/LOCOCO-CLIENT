import React from 'react';

import { useTranslations } from 'next-intl';

import { InfoChip } from '@lococo/design-system/info-chip';

import QAndA from './q-and-a';

export default function FQAs() {
  const t = useTranslations('howItWork.FAQs');
  return (
    <div className="flex flex-col gap-[4.8rem]">
      <p className="head1 font-[700] text-pink-500">{t('title')}</p>
      <div className="flex flex-col gap-[4rem]">
        <InfoChip
          text={t('creatorLevels.title')}
          size="lg"
          color="default"
          className="w-fit"
        />
        <div className="flex flex-col gap-[3.2rem]">
          <QAndA
            question={t('creatorLevels.fistQ')}
            answer={t('creatorLevels.fistA')}
          />
          <QAndA
            question={t('creatorLevels.secondQ')}
            answer={t('creatorLevels.secondA')}
          />
          <QAndA
            question={t('creatorLevels.thirdQ')}
            answer={t('creatorLevels.thirdA')}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[4rem]">
        <InfoChip
          text={t('shipping.title')}
          size="lg"
          color="default"
          className="w-fit"
        />
        <div className="flex flex-col gap-[3.2rem]">
          <QAndA
            question={t('shipping.firstQ')}
            answer={t('shipping.firstA')}
          />
          <QAndA
            question={t('shipping.secondQ')}
            answer={t('shipping.secondA')}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[4rem]">
        <InfoChip
          text={t('penaltyPolicy.title')}
          size="lg"
          color="default"
          className="w-fit"
        />
        <div className="flex flex-col gap-[3.2rem]">
          <QAndA
            question={t('penaltyPolicy.firstQ')}
            answer={t('penaltyPolicy.firstA')}
          />
          <QAndA
            question={t('penaltyPolicy.secondQ')}
            answer={t('penaltyPolicy.secondA')}
          />
          <QAndA
            question={t('penaltyPolicy.thirdQ')}
            answer={t('penaltyPolicy.thirdA')}
          />
        </div>
      </div>
    </div>
  );
}
