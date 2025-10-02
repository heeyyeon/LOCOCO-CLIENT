import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';

import {
  ApiResponseBrandNoteRevisionResponse,
  ApiResponseCampaignReviewDetailListResponse,
} from '../../../../../../swagger-codegen/data-contracts';
import { BRAND_FEEDBACK_KEYS } from '../../constant/querykey';

export const useGetReview = (campaignReviewId: number) => {
  const fetchReview = async (campaignReviewId: number) => {
    const response =
      await apiRequest<ApiResponseCampaignReviewDetailListResponse>({
        endPoint: `/api/brands/my/campaigns/creators/${campaignReviewId}/review`,
        method: 'GET',
      });
    return response;
  };
  return useQuery({
    queryKey: BRAND_FEEDBACK_KEYS.REVIEW(campaignReviewId),
    queryFn: () => fetchReview(campaignReviewId),
  });
};

export const useBrandNote = (campaignReviewId: number, brandNote: string) => {
  const saveBrandNote = async (action: 'SAVE_DRAFT' | 'SUBMIT') => {
    const response = await apiRequest<ApiResponseBrandNoteRevisionResponse>({
      endPoint: `/api/brands/my/reviews/${campaignReviewId}/revision-request`,
      method: 'POST',
      params: { action: action, campaignReviewId: campaignReviewId.toString() },
      data: { brandNote },
    });
    return response;
  };
  return useMutation({
    mutationFn: (action: 'SAVE_DRAFT' | 'SUBMIT') => saveBrandNote(action),
  });
};
