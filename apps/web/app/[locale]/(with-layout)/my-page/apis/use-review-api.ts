'use client';

import { useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';

import { ApiResponseCompletedReviewResponse } from '../../../../../swagger-codegen/data-contracts';
import { CAMPAIGN_REVIEW_KEYS } from '../constant/queryKey';

export const useReviewResult = (campaignId: number) => {
  const fetchReviewResult = async (
    campaignId: number
  ): Promise<ApiResponseCompletedReviewResponse> => {
    const response = await apiRequest<ApiResponseCompletedReviewResponse>({
      endPoint: `/api/campaignReviews/${campaignId}/results`,
    });

    if (!response.success) {
      throw new Error('리뷰 결과 데이터를 불러오는데 실패했습니다.');
    }
    return response;
  };
  return useQuery({
    queryKey: CAMPAIGN_REVIEW_KEYS.reviewResult(campaignId),
    queryFn: () => fetchReviewResult(campaignId),
  });
};
