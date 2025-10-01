import {
  ApiResponseBrandMyPageResponse,
  ApiResponseVoid,
  BrandMyPageUpdateRequest,
} from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

export const getBrandProfile = async () => {
  const response = await apiRequest<ApiResponseBrandMyPageResponse>({
    endPoint: '/api/brands/profile',
  });
  return response.data;
};

export const patchBrandProfile = async (body: BrandMyPageUpdateRequest) => {
  const response = await apiRequest<ApiResponseVoid>({
    endPoint: '/api/brands/profile',
    data: body,
    method: 'PATCH',
  });
  return response;
};
