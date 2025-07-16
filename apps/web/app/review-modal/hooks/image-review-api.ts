import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import {
  ApiResponseImageReviewDetailResponse,
  ApiResponseMainImageReviewResponse,
} from '../../../api/data-contracts';
import { REVIEW_KEYS } from '../../../constants/query-key';

export const useImageReviews = () => {
  return useQuery({
    queryKey: REVIEW_KEYS.IMAGE_LISTS(),
    queryFn: async (): Promise<ApiResponseMainImageReviewResponse> => {
      return apiRequest({
        endPoint: '/api/reviews/image',
        method: 'GET',
      });
    },
  });
};

export const useAllImageReviewDetails = (
  reviews: { reviewId: number }[] | undefined
) => {
  return useQueries({
    queries: (reviews || []).map((review) => ({
      queryKey: REVIEW_KEYS.IMAGE_DETAIL(review.reviewId),
      queryFn: async (): Promise<ApiResponseImageReviewDetailResponse> => {
        return apiRequest({
          endPoint: `/api/reviews/details/${review.reviewId}/image`,
          method: 'GET',
        });
      },
      enabled: !!reviews && reviews.length > 0,
    })),
  });
};

export const useImageReviewDetail = (reviewId: number) => {
  return useQuery({
    queryKey: REVIEW_KEYS.IMAGE_DETAIL(reviewId),
    queryFn: async (): Promise<ApiResponseImageReviewDetailResponse> => {
      return apiRequest({
        endPoint: `/api/reviews/details/${reviewId}/image`,
        method: 'GET',
      });
    },
    enabled: !!reviewId,
  });
};

export const useReviewLikeToggle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      return apiRequest({
        endPoint: `/api/likes/reviews/${reviewId}`,
        method: 'POST',
      });
    },
    onSuccess: (_, reviewId) => {
      if (typeof reviewId === 'number') {
        queryClient.invalidateQueries({
          queryKey: REVIEW_KEYS.IMAGE_DETAIL(reviewId),
        });
      }
    },
  });
};
