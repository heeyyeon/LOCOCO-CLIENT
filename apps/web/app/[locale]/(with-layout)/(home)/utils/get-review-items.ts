import { queryOptions } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { REVIEW_KEYS } from 'constants/query-key';
import {
  ApiResponseMainImageReviewResponse,
  ApiResponseMainVideoReviewResponse,
  MainImageReviewResponse,
} from 'swagger-codegen/data-contracts';

export function getVideoReviews() {
  return queryOptions<ApiResponseMainVideoReviewResponse | null>({
    queryKey: [...REVIEW_KEYS.VIDEO_LISTS(), 'main'],
    queryFn: () =>
      apiRequest<ApiResponseMainVideoReviewResponse>({
        endPoint: '/api/reviews/video',
      }),
  });
}

export function getImageReviews() {
  return queryOptions<ApiResponseMainImageReviewResponse | null>({
    queryKey: [...REVIEW_KEYS.IMAGE_LISTS(), 'main'],
    queryFn: () =>
      apiRequest<ApiResponseMainImageReviewResponse>({
        endPoint: '/api/reviews/image',
      }),
  });
}

export const emptyReviewData: MainImageReviewResponse = {
  imageReviews: Array.from({ length: 4 }, (_, index) => ({
    reviewId: -(index + 1), // 음수로 구분
    brandName: '데이터 준비중',
    productName: '리뷰 정보를 불러오는 중입니다',
    likeCount: 0,
    productId: 0,
    rank: 0, // 랭킹 없음
    reviewImage: '', // 빈 이미지
  })),
};
