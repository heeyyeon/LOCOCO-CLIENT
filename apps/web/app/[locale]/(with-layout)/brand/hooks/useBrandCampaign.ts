import { useQuery } from '@tanstack/react-query';

import { getBrandMyCampaign } from '../api';

interface Campaign {
  id: number;
  campaignImageUrl: string;
  title: string;
  applyDeadline: string;
  applicantNumber: number;
  recruitmentNumber: number;
  campaignStatus:
    | 'OPEN_RESERVED'
    | 'ALL'
    | 'COMPLETED'
    | 'WAITING_APPROVAL'
    | 'DRAFT'
    | 'ACTIVE';
}

interface PageInfo {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  isLast: boolean;
}

interface CampaignsData {
  campaigns: Campaign[];
  pageInfo: PageInfo;
}

export interface BrandCampaignsResponse {
  success: boolean;
  status: number;
  message: string;
  data: CampaignsData;
}

export const useBrandCampaigns = () => {
  const { data, isLoading, isError } = useQuery<BrandCampaignsResponse>({
    queryKey: ['brand', 'campaigns'],
    queryFn: async () => {
      return await getBrandMyCampaign({});
    },
  });
  return { data, isLoading, isError };
};
