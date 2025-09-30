import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';
import { CONNECT_SNS_KEYS } from 'constants/query-key';
import {
  type ApiResponseCreatorSnsConnectedResponse,
  ApiResponseVoid,
} from 'swagger-codegen/data-contracts';

import { useAuth } from './use-auth';

// 클라이언트에서 액세스 토큰 가져오는 유틸리티 함수
const getClientAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find((row) => row.startsWith('AccessToken='));
  return tokenCookie?.split('=')[1] || null;
};

const fetchConnectSns =
  async (): Promise<ApiResponseCreatorSnsConnectedResponse> => {
    // 클라이언트에서 액세스 토큰 가져오기
    const accessToken = getClientAccessToken();

    const response = await apiRequest<ApiResponseCreatorSnsConnectedResponse>({
      endPoint: '/api/creator/register/sns-status',
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    });

    if (!response.success) {
      throw new Error('SNS 연결 상태를 불러오는데 실패했습니다.');
    }

    return response;
  };

export const useConnectSns = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: CONNECT_SNS_KEYS.CONNECT_SNS(),
    queryFn: fetchConnectSns,
    enabled: isLoggedIn === true, // 로그인된 사용자에게만 API 호출
  });
};

const connectTiktokApi = async (): Promise<ApiResponseVoid> => {
  // OAuth connect는 브라우저 네비게이션으로 직접 이동
  console.log('🔗 TikTok 연결 시작');
  console.log(
    '📍 NEXT_PUBLIC_API_SERVER_URL:',
    process.env.NEXT_PUBLIC_API_SERVER_URL_SNS
  );

  // 현재 페이지 정보를 세션 스토리지에 저장
  const currentPath = window.location.pathname;
  sessionStorage.setItem('oauth_return_path', currentPath);
  console.log('💾 현재 페이지 저장:', currentPath);

  // Next.js API Route 사용 (인증 처리 후 백엔드로 리다이렉트)
  const connectUrl = `${window.location.protocol}//${window.location.host}/api/auth/sns/tiktok/connect`;
  console.log('🌐 Next.js API Route URL:', connectUrl);

  console.log('🚀 Next.js API Route로 이동 중...');
  window.location.href = connectUrl;

  // Promise는 resolve되지 않음 (페이지가 리다이렉트되므로)
  return new Promise(() => {});
};

export const useConnectTiktok = () => {
  return useMutation({
    mutationFn: connectTiktokApi,
  });
};

const connectInstagramApi = async (): Promise<ApiResponseVoid> => {
  // OAuth connect는 브라우저 네비게이션으로 직접 이동
  console.log('📸 Instagram 연결 시작');
  console.log(
    '📍 NEXT_PUBLIC_API_SERVER_URL:',
    process.env.NEXT_PUBLIC_API_SERVER_URL
  );

  // 현재 페이지 정보를 세션 스토리지에 저장
  const currentPath = window.location.pathname;
  sessionStorage.setItem('oauth_return_path', currentPath);
  console.log('💾 현재 페이지 저장:', currentPath);

  const connectUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/sns/instagram/connect`;
  console.log('🌐 연결 URL:', connectUrl);

  console.log('🚀 Instagram OAuth 페이지로 이동 중...');
  window.location.href = connectUrl;

  // Promise는 resolve되지 않음 (페이지가 리다이렉트되므로)
  return new Promise(() => {});
};

export const useConnectInstagram = () => {
  return useMutation({
    mutationFn: connectInstagramApi,
  });
};

// OAuth 콜백 처리 훅
export const useOAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('🔄 OAuth 콜백 처리 시작');
    console.log('📍 현재 URL:', window.location.href);
    console.log('🔍 URL 파라미터:', Object.fromEntries(searchParams.entries()));

    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    console.log('✅ success:', success);
    console.log('❌ error:', error);
    console.log('🔑 code:', code);
    console.log('🎯 state:', state);

    // 저장된 원래 페이지 경로 가져오기
    const returnPath = sessionStorage.getItem('oauth_return_path');
    console.log('🔙 원래 페이지:', returnPath);

    if (success) {
      console.log('🎉 SNS 연결 성공! 상태 새로고침 중...');
      // SNS 연결 상태 새로고침
      queryClient.invalidateQueries({
        queryKey: CONNECT_SNS_KEYS.CONNECT_SNS(),
      });
    }

    if (error) {
      console.log('💥 OAuth 에러 발생:', error);
      // 에러 시에는 원래 페이지로 돌아가되 에러 파라미터 추가
      const errorPath = returnPath || '/sign-up/creator/sns-links';
      router.replace(
        `${errorPath}${errorPath.includes('?') ? '&' : '?'}error=oauth_failed`
      );
      return;
    }

    // URL 파라미터 정리 및 원래 페이지로 리다이렉트
    console.log('🧹 URL 파라미터 정리 중...');
    const finalPath = returnPath || '/sign-up/creator/sns-links';
    console.log('🏠 최종 리다이렉트 경로:', finalPath);

    // 세션 스토리지에서 원래 페이지 정보 제거
    sessionStorage.removeItem('oauth_return_path');

    router.replace(finalPath);
  }, [searchParams, router, queryClient]);

  return {
    isProcessingCallback:
      searchParams.has('success') || searchParams.has('error'),
  };
};
