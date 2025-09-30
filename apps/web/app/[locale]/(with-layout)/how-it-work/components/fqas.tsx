import React from 'react';

import { useTranslations } from 'next-intl';

import { InfoChip } from '@lococo/design-system/info-chip';

import QAndA from './q-and-a';

export default function FQAs() {
  const t = useTranslations('howItWork.FAQs');

  return (
    <div className="flex flex-col gap-[4.8rem]">
      <p className="head1 font-[700] text-pink-500">{t('title')}</p>
      <FQAsItem infoChipText={t('creatorLevels.title')}>
        <QAndA
          question={t('creatorLevels.firstQ')}
          answer={t('creatorLevels.firstA')}
        />
        <QAndA
          question={t('creatorLevels.secondQ')}
          answer={t('creatorLevels.secondA')}
        />
        <QAndA
          question={t('creatorLevels.thirdQ')}
          answer={t('creatorLevels.thirdA')}
        />
      </FQAsItem>
      <FQAsItem infoChipText={t('shipping.title')}>
        <QAndA question={t('shipping.firstQ')} answer={t('shipping.firstA')} />
        <QAndA
          question={t('shipping.secondQ')}
          answer={t('shipping.secondA')}
        />
      </FQAsItem>
      <FQAsItem infoChipText={t('penaltyPolicy.title')}>
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
      </FQAsItem>
    </div>
  );
}

function FQAsItem({
  infoChipText,
  children,
}: {
  infoChipText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[4rem]">
      <InfoChip
        text={infoChipText}
        size="lg"
        color="default"
        className="w-fit"
      />
      <div className="flex flex-col gap-[3.2rem]">{children}</div>
    </div>
  );
}
