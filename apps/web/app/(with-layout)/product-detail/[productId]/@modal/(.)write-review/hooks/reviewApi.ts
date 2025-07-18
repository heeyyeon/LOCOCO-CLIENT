import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResponseReviewResponse, ReviewRequest } from 'api/data-contracts';
import { apiRequest } from 'app/api/apiRequest';
import { PRODUCT_DETAIL_QUERY_KEYS } from '../../../queries';

export const usePostReview = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      review,
    }: {
      productId: number;
      review: ReviewRequest;
    }) => {
      return apiRequest<ApiResponseReviewResponse>({
        endPoint: `/api/reviews/${productId}`,
        method: 'POST',
        data: review,
      });
    },

    onSuccess: (data, variables) => {
      console.log('리뷰 작성 성공:', data);
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({
        queryKey: PRODUCT_DETAIL_QUERY_KEYS.REVIEW_LIST(variables.productId),
      });
    },

    onError: (error) => {
      console.error('리뷰 작성 실패:', error);
    },
  });
};
