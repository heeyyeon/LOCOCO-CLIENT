import {
  ApiResponseMediaPresignedUrlResponse,
  ApiResponseReviewReceiptResponse,
} from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

export interface CombinedReviewData {
  firstMediaUrls?: string[];
  firstCaptionWithHashtags?: string;
  secondMediaUrls?: string[];
  secondCaptionWithHashtags?: string;
  secondPostUrl?: string;
}

export const getMediaPresignedUrls = async (
  file: File[]
): Promise<string[]> => {
  const response = await apiRequest<ApiResponseMediaPresignedUrlResponse>({
    endPoint: '/api/reviews/media',
    method: 'POST',
    data: {
      mediaType: file.map((file) => file.type),
    },
  });

  if (!response.data?.mediaUrl) {
    throw new Error('Presigned URL 발급에 실패했습니다.');
  }

  return response.data?.mediaUrl;
};

export const uploadMediaToPresignedUrl = async (
  file: File,
  presignedUrl: string
): Promise<string> => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('미디어 업로드에 실패했습니다.');
  }
  return response.url;
};

export const submitReviewApi = async (
  campaignId: number,
  data: CombinedReviewData,
  round: string
) => {
  const endPoint =
    round === 'FIRST'
      ? `/api/campaignReviews/${campaignId}/first`
      : `/api/campaignReviews/${campaignId}/second`;

  const response = await apiRequest<ApiResponseReviewReceiptResponse>({
    endPoint,
    method: 'POST',
    data,
  });

  if (!response.success) {
    throw new Error('리뷰 제출에 실패했습니다.');
  }

  return response.data;
};
