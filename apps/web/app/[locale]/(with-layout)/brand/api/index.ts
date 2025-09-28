import { apiRequest } from 'app/api/apiRequest';

import { BrandCampaignsResponse } from '../hooks/useBrandCampaign';

interface GetBrandMyCampaignProps {
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
}: GetBrandMyCampaignProps): Promise<BrandCampaignsResponse> => {
  const response = await apiRequest<BrandCampaignsResponse>({
    endPoint: `/api/brands/my/campaigns?status=${status}&page=${page}&size=${size}`,
  });
  return response;
};
