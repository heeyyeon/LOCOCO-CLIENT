import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';

import {
  ApiResponseBrandNoteRevisionResponse,
  ApiResponseCampaignReviewDetailListResponse,
} from '../../../../../../swagger-codegen/data-contracts';
import { BRAND_FEEDBACK_KEYS } from '../../constant/querykey';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
};

export const useGetReview = (campaignReviewId: number) => {
  const fetchReview = async (campaignReviewId: number) => {
    const response =
      await apiRequest<ApiResponseCampaignReviewDetailListResponse>({
        endPoint: `/api/brands/my/campaigns/creators/${campaignReviewId}/review`,
        method: 'GET',
        headers,
      });
    return response;
  };
  return useQuery({
    queryKey: BRAND_FEEDBACK_KEYS.REVIEW(campaignReviewId),
    queryFn: () => fetchReview(campaignReviewId),
  });
};

export const useSBrandNote = (campaignReviewId: number, brandNote: string) => {
  const saveBrandNote = async (campaignReviewId: number, brandNote: string) => {
    const response = await apiRequest<ApiResponseBrandNoteRevisionResponse>({
      endPoint: `/api/brands/my/reviews/${campaignReviewId}/revision-request`,
      method: 'POST',
      headers,
      data: { brandNote },
    });
    return response;
  };
  return useMutation({
    mutationFn: () => saveBrandNote(campaignReviewId, brandNote),
  });
};
