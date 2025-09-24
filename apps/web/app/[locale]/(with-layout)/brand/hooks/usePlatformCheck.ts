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

  const toggleChip = (type: SocialPlatform) => {
    setSelectStatus((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return { selectStatus, toggleChip };
};
