import { useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { ApiResponseCreatorSnsLinkResponse } from 'swagger-codegen/data-contracts';

import { SNS_CONNECTION_KEYS } from '../constant/queryKey';

export const getSnsConnection = async () => {
  const response = await apiRequest<ApiResponseCreatorSnsLinkResponse>({
    endPoint: '/api/creator/sns-link',
    method: 'GET',
  });

  return response;
};

export const useSnsConnection = () => {
  return useQuery<ApiResponseCreatorSnsLinkResponse>({
    queryKey: SNS_CONNECTION_KEYS.ALL,
    queryFn: () => getSnsConnection(),
  });
};
