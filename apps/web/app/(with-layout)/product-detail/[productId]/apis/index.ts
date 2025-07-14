import { apiRequest } from 'app/api/apiRequest';
import { ProductDetailResponse } from '../types';
import { ProductDetailData } from '../types';

// 상품 상세 정보 응답 타입 정의

/**
 * 상품 상세 정보를 가져오는 API 함수
 * @param productId 상품 ID
 * @returns Promise<ProductDetailResponse>
 */
export const getProductDetail = async (
  productId: number
): Promise<ProductDetailData> => {
  const headers: Record<string, string> = {};

  const response = await apiRequest<ProductDetailResponse>({
    endPoint: `/api/products/details/${productId}`,
    method: 'GET',
    headers,
  });

  return response.data;
};
