import { useQuery } from '@tanstack/react-query';
import {
  ApiResponseBrandMyCampaignListResponse,
  BrandMyCampaignResponse,
} from '@typescript-swagger/data-contracts';
import { CampaignStatus } from 'components/card/utils/getBrandCampaignConfig';

import { GetBrandMyCampaignProps, getBrandMyCampaign } from '../api';

const isValidCampaignStatus = (status: string): status is CampaignStatus => {
  return [
    'DRAFT',
    'WAITING_APPROVAL',
    'OPEN_RESERVED',
    'RECRUITING',
    'RECRUITMENT_CLOSED',
    'IN_REVIEW',
    'COMPLETED',
  ].includes(status);
};

type TransformedCampaign = Omit<BrandMyCampaignResponse, 'campaignStatus'> & {
  campaignStatus?: CampaignStatus;
};

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

  const transformedCampaigns: TransformedCampaign[] | undefined =
    data?.data?.campaigns?.map((campaign) => ({
      ...campaign,
      campaignStatus: isValidCampaignStatus(campaign.campaignStatus)
        ? campaign.campaignStatus
        : undefined,
    }));

  return {
    campaigns: transformedCampaigns,
    pageInfo: data?.data?.pageInfo,
    isLoading,
    isError,
  };
};
