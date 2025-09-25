import { useState } from 'react';

import { SocialPlatform } from '../component/create-campaign/social-chip';

export const usePlatformCheck = () => {
  const [selectStatus, setSelectStatus] = useState<
    Record<SocialPlatform, boolean>
  >({
    'instagram-post': false,
    'instagram-reels': false,
    'tiktok-video': false,
  });

  const selectedCount = Object.values(selectStatus).filter(Boolean).length;

  const toggleChip = (type: SocialPlatform) => {
    if (selectStatus[type] || selectedCount < 2) {
      setSelectStatus((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  const isDisabled = (type: SocialPlatform) => {
    const selectedCount = Object.values(selectStatus).filter(Boolean).length;
    return !selectStatus[type] && selectedCount >= 2;
  };

  return { selectStatus, toggleChip, selectedCount, isDisabled };
};
