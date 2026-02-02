import { apiRequest } from '../../../../web/app/api/apiRequest';
import {
  ApiResponseProductBrandNameListResponse,
  ApiResponseAdminProductCreateResponse,
  AdminProductCreateRequest,
  ApiResponseProductImageResponse,
  ProductImagePresignedUrlRequest,
} from '../../../../web/swagger-codegen/data-contracts';

export const getProductBrandNames = async (
  startsWith?: string
): Promise<ApiResponseProductBrandNameListResponse> => {
  const params = startsWith ? { startsWith } : undefined;
  const response = await apiRequest<ApiResponseProductBrandNameListResponse>({
    endPoint: '/api/product-brand',
    method: 'GET',
    params,
  });
  return response;
};

export const getProductImagePresignedUrls = async (
  data: ProductImagePresignedUrlRequest
): Promise<ApiResponseProductImageResponse> => {
  const response = await apiRequest<ApiResponseProductImageResponse>({
    endPoint: '/api/admin/products/images',
    method: 'POST',
    data,
  });
  return response;
};

export const createProduct = async (
  data: AdminProductCreateRequest
): Promise<ApiResponseAdminProductCreateResponse> => {
  const response = await apiRequest<ApiResponseAdminProductCreateResponse>({
    endPoint: '/api/admin/product',
    method: 'POST',
    data,
  });
  return response;
};
