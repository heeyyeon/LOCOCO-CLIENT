import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import {
  ApiResponseMainImageReviewResponse,
  ApiResponseImageReviewDetailResponse,
} from '../../../api/data-contracts';

// 이미지 리뷰 목록 조회
export const useImageReviewList = () => {
  return useQuery({
    queryKey: ['imageReviews', 'list'],
    queryFn: async (): Promise<ApiResponseMainImageReviewResponse> => {
      return apiRequest({
        endPoint: '/api/reviews/images',
        method: 'GET',
      });
    },
  });
};

// 특정 이미지 리뷰 상세 조회
export const useImageReviewDetail = (reviewId: number) => {
  return useQuery({
    queryKey: ['imageReview', 'detail', reviewId],
    queryFn: async (): Promise<ApiResponseImageReviewDetailResponse> => {
      return apiRequest({
        endPoint: `/api/reviews/images/${reviewId}`,
        method: 'GET',
      });
    },
    enabled: !!reviewId,
  });
};

// 리뷰 좋아요 토글
export const useReviewLikeToggle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      return apiRequest({
        endPoint: `/api/likes/reviews/${reviewId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      });
    },
    onSuccess: () => {
      // 리뷰 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ['imageReviews'] });
      queryClient.invalidateQueries({ queryKey: ['imageReview'] });
    },
  });
};
