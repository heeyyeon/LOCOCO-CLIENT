import { useQuery } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { CONNECT_SNS_KEYS } from 'constants/query-key';
import { type ApiResponseCreatorSnsConnectedResponse } from 'swagger-codegen/data-contracts';

const fetchConnectSns =
  async (): Promise<ApiResponseCreatorSnsConnectedResponse> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };

    const response = await apiRequest<ApiResponseCreatorSnsConnectedResponse>({
      endPoint: '/api/creator/register/sns-status',
      headers,
    });

    if (!response.success) {
      throw new Error('SNS 연결 상태를 불러오는데 실패했습니다.');
    }

    return response;
  };

export const useConnectSns = () => {
  return useQuery({
    queryKey: CONNECT_SNS_KEYS.CONNECT_SNS(),
    queryFn: fetchConnectSns,
  });
};
