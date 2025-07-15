import { ApiResponseReviewImageResponse } from 'api/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

export const getVideoReviews = async () => {};
export const getImageReviews = async () => {
  try {
    const reviewImageResponse =
      await apiRequest<ApiResponseReviewImageResponse>({
        endPoint: '/api/reviews/image',
      });
    return reviewImageResponse;
  } catch {
    throw new Error('이미지 리뷰 데이터를 불러오는데 실패했습니다.');
  }
};
