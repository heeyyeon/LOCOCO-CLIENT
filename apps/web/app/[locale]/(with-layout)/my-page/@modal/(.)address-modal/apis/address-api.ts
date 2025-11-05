import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApiResponseCreatorAddressInfo,
  ApiResponseVoid,
} from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

import { CAMPAIGN_REVIEW_KEYS, PROFILE_KEYS } from '../../../constant/queryKey';

const fetchAddress = async (): Promise<ApiResponseCreatorAddressInfo> => {
  const response = await apiRequest<ApiResponseCreatorAddressInfo>({
    endPoint: '/api/creator/profile/address',
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

const postAddress = async (campaignId: number): Promise<boolean> => {
  const response = await apiRequest<ApiResponseVoid>({
    endPoint: `/api/creator/profile/${campaignId}/address`,
    method: 'POST',
  });

  if (!response.success) {
    throw new Error('주소 데이터를 저장하는데 실패했습니다.');
  }

  return response.success;
};

export const usePostAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaignId: number) => postAddress(campaignId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.address() });
      queryClient.invalidateQueries({ queryKey: CAMPAIGN_REVIEW_KEYS.ALL });
    },
  });
};
