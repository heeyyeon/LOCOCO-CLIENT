import { useQueryClient } from '@tanstack/react-query';
import { apiRequest } from 'app/api/apiRequest';

import { CAMPAIGN_REVIEW_KEYS } from '../../../my-page/constant/queryKey';
import { CampaignDetailResponse, CreatorCampaignApplyResponse } from '../types';

export const getCampaignDetail = async (campaignId: string) => {
  const response = await apiRequest<CampaignDetailResponse>({
    endPoint: `/api/campaigns/${campaignId}`,
    method: 'GET',
  });

  if (!response.data) {
    throw new Error('Campaign detail not found');
  }

  return response.data;
};

// 지원자 수용인원 full / 이미 지원한 캠페인 - 409 대응 필요
export const applyCampaign = async (campaignId: string) => {
  const queryClient = useQueryClient();
  const response = await apiRequest<CreatorCampaignApplyResponse>({
    endPoint: `/api/creator-campaign/${campaignId}/participate`,
    method: 'POST',
  });
  if (response.status === 409) {
    alert('Campaign already applied');
    throw new Error('Campaign already applied');
  }

  if (queryClient) {
    queryClient.invalidateQueries({
      queryKey: CAMPAIGN_REVIEW_KEYS.all,
    });
  }

  return response;
};
