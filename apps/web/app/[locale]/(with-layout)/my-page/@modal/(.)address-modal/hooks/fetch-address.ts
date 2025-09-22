import { useQuery } from '@tanstack/react-query';
import { ApiResponseCreatorAddressInfo } from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

import { PROFILE_KEYS } from '../../../../my-page/constant/queryKey';

// 인증 토큰
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzU4NTA4MTgyLCJleHAiOjE3NTkxMTI5ODIsImlkIjoyLCJyb2xlIjoiUk9MRV9DUkVBVE9SIiwibGluZUlkIjoiMiJ9.ofs0VciJfzWoERuHYQ-nOehSLirEiWsJUOfs_Wwt0xA';

const fetchAddress = async (): Promise<ApiResponseCreatorAddressInfo> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  };

  const response = await apiRequest<ApiResponseCreatorAddressInfo>({
    endPoint: '/api/creator/profile/address',
    headers,
  });

  if (!response.success) {
    throw new Error('주소 데이터를 불러오는데 실패했습니다.');
  }

  return response;
};

export const useFetchAddress = () => {
  return useQuery({
    queryKey: PROFILE_KEYS.address(),
    queryFn: fetchAddress,
  });
};
