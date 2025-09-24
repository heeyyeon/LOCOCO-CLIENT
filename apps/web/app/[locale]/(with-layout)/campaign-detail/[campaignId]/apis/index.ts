import { apiRequest } from 'app/api/apiRequest';

import { CampaignDetailResponse } from '../types';

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
