import { apiRequest } from 'app/api/apiRequest';
import { ApiResponseProductBrandNameListResponse } from 'swagger-codegen/data-contracts';

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