import { apiRequest } from 'app/api/apiRequest';

import { ContentsPerformanceApiResponse } from '../types';

export const getContentsPerformance = async (
  campaignId: string | undefined,
  page: number = 0,
  size: number = 10
) => {
  const response = await apiRequest<ContentsPerformanceApiResponse>({
    method: 'GET',
    endPoint: `/api/brands/my/campaigns/${campaignId}/performances?page=${page}&size=${size}`,
  });
  return response;
};
