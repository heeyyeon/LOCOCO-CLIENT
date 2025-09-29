import { useQuery } from '@tanstack/react-query';
import { ApiResponseBrandMyCampaignListResponse } from '@typescript-swagger/data-contracts';

import { GetBrandMyCampaignProps, getBrandMyCampaign } from '../api';

export const useBrandCampaigns = ({
  status = 'ALL',
  page = 0,
  size = 6,
}: GetBrandMyCampaignProps = {}) => {
  const { data, isLoading, isError } =
    useQuery<ApiResponseBrandMyCampaignListResponse>({
      queryKey: ['brand', 'campaigns', status, page, size],
      queryFn: () => getBrandMyCampaign({ status, page, size }),
    });

  return { data, isLoading, isError };
};
