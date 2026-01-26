import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { ApiResponseBrandMyPageResponse } from 'swagger-codegen/data-contracts';

import { BRAND_PROFILE_KEYS } from '../constant/querykey';

export const useBrandProfile = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const getBrandProfile = async () => {
    const response = await apiRequest<ApiResponseBrandMyPageResponse>({
      endPoint: '/api/brands/profile',
      method: 'GET',
    });
    return response;
  };
  return useQuery({
    queryKey: BRAND_PROFILE_KEYS.PROFILE(),
    queryFn: () => getBrandProfile(),
    enabled: role !== 'admin', // role=admin일 때만 쿼리 실행
  });
};
