'use client';

import { useTranslations } from 'next-intl';

export default function GnbMenu() {
  const t = useTranslations('gnb');
  return (
    <div className="flex">
      <button className="p-[1.6rem]">{t('campaigns')}</button>
      <button className="p-[1.6rem]">{t('howItWorks')}</button>
    </div>
  );
}
