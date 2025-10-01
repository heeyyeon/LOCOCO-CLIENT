import React from 'react';

import { SvgPost, SvgReels, SvgVideo } from '@lococo/icons';

import { ContentPlatform } from '../../types';

interface ContentTypeProps {
  contentType: ContentPlatform;
}
export default function ContentType({ contentType }: ContentTypeProps) {
  const CONTENT_TYPE_MAP = {
    INSTA_REELS: 'Reels',
    TIKTOK_VIDEO: 'Video',
    INSTA_POST: 'Post',
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
