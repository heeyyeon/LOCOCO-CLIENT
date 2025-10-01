import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { CONNECT_SNS_KEYS } from 'constants/query-key';
import {
  type ApiResponseCreatorSnsConnectedResponse,
  ApiResponseVoid,
} from 'swagger-codegen/data-contracts';

import { useAuth } from './use-auth';

const fetchConnectSns =
  async (): Promise<ApiResponseCreatorSnsConnectedResponse> => {
    console.log('SNS 상태 API 호출 시작:', {
      timestamp: new Date().toLocaleString(),
      endpoint: '/api/creator/register/sns-status',
      method: 'apiRequest 자동 토큰 관리',
    });

    const response = await apiRequest<ApiResponseCreatorSnsConnectedResponse>({
      endPoint: '/api/creator/register/sns-status',
    });

    console.log('SNS 상태 API 응답:', {
      success: response.success,
      status: response.status,
      timestamp: new Date().toLocaleString(),
    });

    if (!response.success) {
      throw new Error('SNS 연결 상태를 불러오는데 실패했습니다.');
    }

    return response;
  };

export const useConnectSns = () => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');

    if (success === 'true') {
      console.log('OAuth 성공 감지, SNS 상태 다시 확인');
      queryClient.invalidateQueries({
        queryKey: CONNECT_SNS_KEYS.CONNECT_SNS(),
      });

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('success');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [queryClient]);

  return useQuery({
    queryKey: CONNECT_SNS_KEYS.CONNECT_SNS(),
    queryFn: fetchConnectSns,
    enabled: isLoggedIn === true,
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('403')) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

const connectTiktokApi = async (): Promise<ApiResponseVoid> => {
  const currentPath = window.location.pathname;

  const connectUrl = new URL(
    `${window.location.protocol}//${window.location.host}/api/auth/sns/tiktok/connect`
  );
  connectUrl.searchParams.set('returnTo', currentPath);

  window.location.href = connectUrl.toString();

  return new Promise(() => {});
};

export const useConnectTiktok = () => {
  return useMutation({
    mutationFn: connectTiktokApi,
  });
};

const connectInstagramApi = async (): Promise<ApiResponseVoid> => {
  const currentPath = window.location.pathname;

  const connectUrl = new URL(
    `${window.location.protocol}//${window.location.host}/api/auth/sns/instagram/connect`
  );
  connectUrl.searchParams.set('returnTo', currentPath);

  window.location.href = connectUrl.toString();

  return new Promise(() => {});
};

export const useConnectInstagram = () => {
  return useMutation({
    mutationFn: connectInstagramApi,
  });
};

export const useOAuthCallback = () => {
  return {
    isProcessingCallback: false,
  };
};
