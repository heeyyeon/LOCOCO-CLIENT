import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  ApiResponseCreatorMyCampaignListResponse,
  CreatorMyCampaignResponse,
} from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

import { CAMPAIGN_REVIEW_KEYS } from '../constant/queryKey';
import { getMyPageUserRoleOrThrow } from './user-role';

interface UseMyCampaignParams {
  page?: number;
  size?: number;
}

const fetchMyCampaigns = async (
  params: UseMyCampaignParams = {}
): Promise<{
  campaigns: CreatorMyCampaignResponse[];
  totalPages: number;
  totalElements: number;
}> => {
  const { page = 0, size = 9 } = params;
  const role = await getMyPageUserRoleOrThrow();

  if (role === 'CUSTOMER') {
    return {
      campaigns: [],
      totalPages: 0,
      totalElements: 0,
    };
  }

  const response = await apiRequest<ApiResponseCreatorMyCampaignListResponse>({
    endPoint: `/api/creator/profile/campaigns?page=${page}&size=${size}`,
    method: 'GET',
  });

  if (!response.success) {
    throw new Error('캠페인 데이터를 불러오는데 실패했습니다.');
  }

  const data = response.data;
  const campaigns = data?.campaigns || [];
  const pageInfo = data?.pageInfo;
  const totalPages = pageInfo?.isLast ? (page || 0) + 1 : (page || 0) + 2;
  const totalElements = pageInfo?.numberOfElements || 0;

  return {
    campaigns,
    totalPages,
    totalElements,
  };
};

const useMyCampaign = (
  params: UseMyCampaignParams = {}
): UseQueryResult<
  {
    campaigns: CreatorMyCampaignResponse[];
    totalPages: number;
    totalElements: number;
  },
  Error
> => {
  return useQuery({
    queryKey: CAMPAIGN_REVIEW_KEYS.myCampaigns(params),
    queryFn: () => fetchMyCampaigns(params),
  });
};

export default useMyCampaign;
