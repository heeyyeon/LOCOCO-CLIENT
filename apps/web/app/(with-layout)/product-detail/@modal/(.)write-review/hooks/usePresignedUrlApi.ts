import {
  ReviewMediaRequest,
  ApiResponseReviewMediaResponse,
  ReviewReceiptRequest,
  ApiResponseReviewReceiptResponse,
} from '../../../../../../api/data-contracts';
import { apiRequest } from '../../../../../../app/api/apiRequest';

export const getMediaPresignedUrl = async (request: ReviewMediaRequest) => {
  return await apiRequest<ApiResponseReviewMediaResponse>({
    endPoint: '/api/reviews/media',
    method: 'POST',
    data: request,
  });
};

export const getReceiptPresignedUrl = async (request: ReviewReceiptRequest) => {
  return await apiRequest<ApiResponseReviewReceiptResponse>({
    endPoint: '/api/reviews/receipt',
    method: 'POST',
    data: request,
  });
};
