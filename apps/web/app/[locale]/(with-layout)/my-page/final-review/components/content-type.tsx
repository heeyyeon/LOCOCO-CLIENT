import React from 'react';

import { useTranslations } from 'next-intl';

import { SvgInstagram, SvgTiktok } from '@lococo/icons';
import { cn } from '@lococo/utils';

interface ContentTypeProps {
  contentType?: string;
}

export default function ContentType({ contentType }: ContentTypeProps) {
  const t = useTranslations('myPage.finalReview');

  const CONTENT_TYPES = [
    {
      label: t('contentType.instagramPost'),
      value: 'INSTA_POST',
      icon: <SvgInstagram size={20} />,
    },
    {
      label: t('contentType.instagramReels'),
      value: 'INSTA_REELS',
      icon: <SvgInstagram size={20} />,
    },
    {
      label: t('contentType.tiktokVideo'),
      value: 'TIKTOK_VIDEO',
      icon: <SvgTiktok size={20} />,
    },
  ] as const;

  const getButtonClassName = (dataValue: string, value: string) =>
    cn(
      'body1 flex items-center gap-[0.5rem] rounded-[2.4rem] border border-gray-400 px-[1.6rem] py-[0.6rem] transition-colors',
      dataValue === value && 'border-pink-500 bg-pink-100 text-pink-500'
    );

  return (
    <div className="flex gap-[1.2rem]">
      {CONTENT_TYPES.map(({ label, value, icon: Icon }) => (
        <div
          key={value}
          className={getButtonClassName(contentType || '', value)}
        >
          {Icon}
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
