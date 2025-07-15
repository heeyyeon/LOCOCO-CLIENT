import { apiRequest } from 'app/api/apiRequest';
import { ProductDetailResponse } from '../types';
import { ProductDetailData } from '../types';
import { YoutubeListResponse } from '../types';
import { YoutubeListData } from '../types';
import { ImageReviewDetailData } from '../types';
import { ImageReviewListResponse } from '../types';

// 상품 상세 정보 응답 타입 정의

/**
 * 상품 상세 정보를 가져오는 API 함수
 * @param productId 상품 ID
 * @returns Promise<ProductDetailResponse>
 */
export const getProductDetail = async (
  productId: number
): Promise<ProductDetailData> => {
  const response = await apiRequest<ProductDetailResponse>({
    endPoint: `/api/products/details/${productId}`,
    method: 'GET',
  });

  if (!response.data) {
    throw new Error('상품 정보를 가져올 수 없습니다.');
  }

  return response.data;
};

export const getYoutubeList = async (
  productId: number
): Promise<YoutubeListData> => {
  const response = await apiRequest<YoutubeListResponse>({
    endPoint: `/api/products/details/${productId}/youtube`,
    method: 'GET',
  });

  if (!response.data) {
    throw new Error('유튜브 정보를 가져올 수 없습니다.');
  }

  return response.data;
};

export const getReviewList = async (
  productId: number
): Promise<ImageReviewDetailData> => {
  const response = await apiRequest<ImageReviewListResponse>({
    endPoint: `/api/reviews/details/image?productId=${productId}&page=0&size=10`,
    method: 'GET',
  });

  if (!response.data) {
    throw new Error('상품 상세 정보를 가져올 수 없습니다.');
  }

  return response.data;
};
