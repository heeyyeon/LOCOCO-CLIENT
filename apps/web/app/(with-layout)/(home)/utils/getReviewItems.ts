import { ApiResponseReviewImageResponse } from 'api/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

export const getVideoReviews = async () => {};
export const getImagesReviews = async () => {
  const reviewImageResponse = await apiRequest<ApiResponseReviewImageResponse>({
    endPoint: '/api/reviews/image',
  });
  return reviewImageResponse;
};
