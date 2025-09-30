import { ApiResponseBrandMyCampaignListResponse } from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

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
