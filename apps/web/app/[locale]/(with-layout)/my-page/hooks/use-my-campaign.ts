import { useQuery } from '@tanstack/react-query';
import {
  ApiResponseCreatorMyCampaignListResponse,
  CreatorMyCampaignResponse,
} from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

import { CAMPAIGN_REVIEW_KEYS } from '../constant/queryKey';

interface UseMyCampaignParams {
  page?: number;
  size?: number;
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
};
const fetchMyCampaigns = async (
  params: UseMyCampaignParams = {}
): Promise<{
  campaigns: CreatorMyCampaignResponse[];
  totalPages: number;
  totalElements: number;
}> => {
  const { page = 0, size = 9 } = params;

  const response = await apiRequest<ApiResponseCreatorMyCampaignListResponse>({
    endPoint: `/api/creator/profile/campaigns?page=${page}&size=${size}`,
    method: 'GET',
    headers,
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

const useMyCampaign = (params: UseMyCampaignParams = {}) => {
  return useQuery({
    queryKey: CAMPAIGN_REVIEW_KEYS.myCampaigns(params),
    queryFn: () => fetchMyCampaigns(params),
  });
};

export default useMyCampaign;
