import React from 'react';

import Image from 'next/image';

import { followerCountFormatter } from '../../../applicants/utils/follower-count-formatter';
import { ContentPlatform } from '../../types';

interface FollowerCountProps {
  contentType: ContentPlatform;
  count?: number;
}

export default function FollowerCount({
  contentType,
  count,
}: FollowerCountProps) {
  const CONTENT_TYPE_MAP = {
    INSTA_REELS: 'instagram',
    TIKTOK_VIDEO: 'tiktok',
    INSTA_POST: 'instagram',
  };
  return (
    <div className="flex items-center gap-[0.8rem]">
      <Image
        src={`/${CONTENT_TYPE_MAP[contentType]}.svg`}
        alt="instagram logo"
        width={24}
        height={24}
      ></Image>
      <p className="text-inter-body3 text-gray-800">
        {count ? followerCountFormatter(count) : '-'}
      </p>
    </div>
  );
}
