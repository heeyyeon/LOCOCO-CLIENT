import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'i18n/navigation';
import { LanguageKey } from 'types/language';
import { CategoryKey } from 'types/tab-category';

import { getCampaignsByCategory } from '../apis';
import { CampaignApiResponse } from '../components/home-section-campaign';
import { campaignKeys } from '../query';

interface UseCampaignsBaseProps {
  section: 'KBeauty' | 'openingSoon';
  page?: number;
  size?: number;
  enablePagination?: boolean;
}

export const useCampaignsBase = ({
  section,
  page = 0,
  size = 6,
  enablePagination = false,
}: UseCampaignsBaseProps) => {
  const [campaignCategory, setCampaignCategory] = useState<CategoryKey>('ALL');
  const [campaignLanguage, setCampaignLanguage] = useState<LanguageKey>('ALL');

  const router = useRouter();
  const params = useParams();
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const currentPage =
    enablePagination && pageValue ? parseInt(pageValue) || 1 : 1;
  const serverPage = enablePagination ? currentPage - 1 : page;

  const { data, isLoading } = useQuery<CampaignApiResponse>({
    queryKey: enablePagination
      ? campaignKeys.byCategoryPaginated(
          campaignCategory,
          section,
          campaignLanguage,
          serverPage,
          size
        )
      : campaignKeys.byCategory(campaignCategory, section, campaignLanguage),
    queryFn: () =>
      getCampaignsByCategory({
        section,
        category: campaignCategory,
        page: serverPage,
        size,
        locale: campaignLanguage,
      }),
  });

  const campaigns = data?.data?.campaigns || [];
  const totalPages = data?.data?.pageInfo
    ? Math.ceil((data.data.pageInfo.numberOfElements || 0) / size)
    : 1;

  const handlePageChange = (page: number) => {
    if (enablePagination) {
      router.push(`/all/${page}`);
    }
  };

  return {
    campaigns,
    isLoading,
    currentPage: enablePagination ? currentPage : 1,
    totalPages,
    campaignCategory,
    setCampaignCategory,
    campaignLanguage,
    setCampaignLanguage,
    handlePageChange,
  };
};

export const useHomeCampaigns = (kindOfCard: 'KBeauty' | 'openingSoon') => {
  const result = useCampaignsBase({
    section: kindOfCard,
    size: 6,
    enablePagination: false,
  });

  return {
    ...result,
    campaigns: result.campaigns.slice(0, 6),
  };
};

export const useCampaignsPaginated = () => {
  return useCampaignsBase({
    section: 'KBeauty',
    size: 12,
    enablePagination: true,
  });
};
