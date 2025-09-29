import { useQuery } from '@tanstack/react-query';
import { ApiResponseCreatorAddressInfo } from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

import { PROFILE_KEYS } from '../../../../my-page/constant/queryKey';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN || ''}`,
};

const fetchAddress = async (): Promise<ApiResponseCreatorAddressInfo> => {
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
