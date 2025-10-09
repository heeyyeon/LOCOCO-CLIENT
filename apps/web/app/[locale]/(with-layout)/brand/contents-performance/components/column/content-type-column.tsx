import React from 'react';

import { useTranslations } from 'next-intl';

import { SvgPost, SvgReels, SvgVideo } from '@lococo/icons';

import { ContentPlatform } from '../../types';

interface ContentTypeProps {
  contentType: ContentPlatform;
}
export default function ContentType({ contentType }: ContentTypeProps) {
  const t = useTranslations('brandContentsPerformance');
  const CONTENT_TYPE_MAP = {
    INSTA_REELS: t('contentType.reels'),
    TIKTOK_VIDEO: t('contentType.video'),
    INSTA_POST: t('contentType.post'),
  };

  const CONTENT_TYPE_ICON_MAP = {
    INSTA_REELS: <SvgReels className="text-pink-400" />,
    TIKTOK_VIDEO: <SvgVideo className="text-pink-400" />,
    INSTA_POST: <SvgPost className="text-pink-400" />,
  };

  return (
    <div className="flex gap-[0.8rem]">
      {CONTENT_TYPE_ICON_MAP[contentType]}
      <p className="text-inter-body3 text-gray-600">
        {CONTENT_TYPE_MAP[contentType]}
      </p>
    </div>
  );
}
