import { ApiResponseBrandMyCampaignListResponse } from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

import { BrandCampaignInfosApiResponse } from '../types';

/**
 * 브랜드 캠페인 정보 목록 조회 API
 * @returns 브랜드의 모든 캠페인 정보 목록
 */

export const getBrandCampaignInfos =
  async (): Promise<BrandCampaignInfosApiResponse> => {
    const response = await apiRequest<BrandCampaignInfosApiResponse>({
      endPoint: '/api/brands/my/campaigns/infos',
      method: 'GET',
    });
    return response;
  };

export interface GetBrandMyCampaignProps {
  status?:
    | 'ALL'
    | 'DRAFT'
    | 'WAITING_APPROVAL'
    | 'OPEN_RESERVED'
    | 'ACTIVE'
    | 'COMPLETED';
  page?: number;
  size?: number;
}

export const getBrandMyCampaign = async ({
  status = 'ALL',
  page = 0,
  size = 6,
}: GetBrandMyCampaignProps): Promise<ApiResponseBrandMyCampaignListResponse> => {
  const response = await apiRequest<ApiResponseBrandMyCampaignListResponse>({
    endPoint: `/api/brands/my/campaigns?status=${status}&page=${page}&size=${size}`,
  });
  return response;
};
