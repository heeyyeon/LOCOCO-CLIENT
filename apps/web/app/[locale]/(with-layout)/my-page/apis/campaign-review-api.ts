import { useQuery } from '@tanstack/react-query';
import { ApiResponseCampaignParticipatedResponse } from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

import { CAMPAIGN_REVIEW_KEYS } from '../constant/queryKey';

const API_SERVER_URL = process.env.NEXT_PUBLIC_AUTH_TOKEN;
const fetchCampaignReview = async (
  campaignId: number,
  round?: string
): Promise<ApiResponseCampaignParticipatedResponse> => {
  const response = await apiRequest<ApiResponseCampaignParticipatedResponse>({
    endPoint: `/api/campaignReviews/my/participation/${campaignId}`,
    method: 'GET',
    params: {
      campaignId: campaignId.toString(),
      round: round || '',
    },
    headers: {
      Authorization: `Bearer ${API_SERVER_URL}`,
    },
  });

  if (!response.success) {
    throw new Error('캠페인 리뷰 데이터를 불러오는데 실패했습니다.');
  }

  return response;
};

export const useFetchCampaignReview = (campaignId: number, round: string) => {
  return useQuery({
    queryKey: CAMPAIGN_REVIEW_KEYS.campaignReview(campaignId, round),
    queryFn: () => fetchCampaignReview(campaignId, round),
  });
};
