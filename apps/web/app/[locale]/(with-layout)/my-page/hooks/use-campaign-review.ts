import { useQuery } from '@tanstack/react-query';
import { ApiResponseListCampaignParticipatedResponse } from '@typescript-swagger/data-contracts';

import { CAMPAIGN_REVIEW_KEYS } from '../constant/queryKey';

const fetchCampaignReview =
  async (): Promise<ApiResponseListCampaignParticipatedResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/campaignReviews/my/participation`
    );

    if (!response.ok) {
      throw new Error('프로필 데이터를 불러오는데 실패했습니다.');
    }

    return response.json();
  };

export const useFetchCampaignReview = () => {
  return useQuery({
    queryKey: CAMPAIGN_REVIEW_KEYS.campaignReview(),
    queryFn: fetchCampaignReview,
  });
};
