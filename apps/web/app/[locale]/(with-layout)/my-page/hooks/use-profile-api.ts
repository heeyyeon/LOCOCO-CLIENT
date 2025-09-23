'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';

import { type CreatorSignupForm } from '../../../(with-layout)/sign-up/creator/utils/signup';
import { type ApiResponseCreatorMyPageResponse } from '../../../../../swagger-codegen/data-contracts';
import { PROFILE_KEYS } from '../constant/queryKey';

const fetchProfile = async (): Promise<ApiResponseCreatorMyPageResponse> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  };

  const response = await apiRequest<ApiResponseCreatorMyPageResponse>({
    endPoint: '/api/creator/profile',
    headers,
  });

  if (!response.success) {
    throw new Error('프로필 데이터를 불러오는데 실패했습니다.');
  }

  return response;
};

const updateProfileApi = async (
  formData: CreatorSignupForm,
  profileImageUrl?: string | null
): Promise<ApiResponseCreatorMyPageResponse> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  };

  const response = await apiRequest<ApiResponseCreatorMyPageResponse>({
    endPoint: '/api/creator/profile',
    method: 'PUT',
    headers,
    data: {
      ...formData,
      profileImageUrl,
    },
  });

  if (!response.success) {
    throw new Error('프로필 업데이트에 실패했습니다.');
  }
  return response;
};

const checkIdAvailabilityApi = async (id: string): Promise<boolean> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  };

  const response = await apiRequest<ApiResponseCreatorMyPageResponse>({
    endPoint: '/api/creator/check-id',
    method: 'POST',
    headers,
    data: { id },
  });

  if (!response.success) {
    throw new Error('ID 중복 체크에 실패했습니다.');
  }

  return true;
};

// 프로필 데이터 조회 훅
export const useProfile = () => {
  return useQuery({
    queryKey: PROFILE_KEYS.profile(),
    queryFn: fetchProfile,
  });
};

// 프로필 업데이트 훅
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      formData,
      profileImageUrl,
    }: {
      formData: CreatorSignupForm;
      profileImageUrl?: string | null;
    }) => updateProfileApi(formData, profileImageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.profile() });
    },
  });
};

// ID 중복 체크 훅
export const useCheckIdAvailability = () => {
  return useMutation({
    mutationFn: checkIdAvailabilityApi,
  });
};

// 기존 useProfileApi 훅 (하위 호환성을 위해 유지)
export const useProfileApi = () => {
  const profileQuery = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const checkIdMutation = useCheckIdAvailability();

  return {
    // 프로필 조회
    isLoading: profileQuery.isLoading,
    error: profileQuery.error?.message || null,
    profileData: profileQuery.data,
    loadProfile: async () => {
      await profileQuery.refetch();
      return profileQuery.data || null;
    },

    // 프로필 업데이트
    updateProfile: async (
      formData: CreatorSignupForm,
      profileImageUrl?: string | null
    ) => {
      try {
        await updateProfileMutation.mutateAsync({ formData, profileImageUrl });
        return true;
      } catch {
        return false;
      }
    },

    // ID 중복 체크
    checkIdAvailability: async (id: string) => {
      try {
        return await checkIdMutation.mutateAsync(id);
      } catch {
        return false;
      }
    },

    // 에러 초기화
    clearError: () => {
      profileQuery.refetch();
    },
  };
};
