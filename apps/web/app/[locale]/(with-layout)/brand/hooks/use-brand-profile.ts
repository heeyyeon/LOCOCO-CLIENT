import { useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { ApiResponseBrandMyPageResponse } from 'swagger-codegen/data-contracts';

import { BRAND_PROFILE_KEYS } from '../constant/querykey';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
};
export const useBrandProfile = () => {
  const getBrandProfile = async () => {
    const response = await apiRequest<ApiResponseBrandMyPageResponse>({
      endPoint: '/api/brands/profile',
      headers,
      method: 'GET',
    });
    return response;
  };
  return useQuery({
    queryKey: BRAND_PROFILE_KEYS.PROFILE(),
    queryFn: () => getBrandProfile(),
  });
};
