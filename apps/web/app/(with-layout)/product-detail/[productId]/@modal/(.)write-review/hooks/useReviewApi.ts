import { useMutation } from '@tanstack/react-query';
import {
  ReviewRequest,
  ApiResponseReviewResponse,
} from '../../../../../../api/data-contracts';
import { apiRequest } from '../../../../../../app/api/apiRequest';

export const usePostReview = (onSuccess?: () => void) => {
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

    onSuccess: (data) => {
      console.log('리뷰 작성 성공:', data);
      if (onSuccess) onSuccess();
    },

    onError: (error) => {
      console.error('리뷰 작성 실패:', error);
    },
  });
};
