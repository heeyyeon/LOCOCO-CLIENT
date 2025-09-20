import { apiRequest } from 'app/api/apiRequest';
import { CategoryKey } from 'types/category';

import { CampaignApiResponse } from '../components/home-section-campaign';

interface GetCampaignProps {
  section: 'KBeauty' | 'openingSoon';
  category: CategoryKey;
  page: number;
  size: number;
  locale: string;
}

export const getCampaignsByCategory = async ({
  section,
  category,
  page,
  size,
  locale,
}: GetCampaignProps): Promise<CampaignApiResponse> => {
  const langParam = locale.toUpperCase();

  const response = await apiRequest<CampaignApiResponse>({
    endPoint: `/api/campaigns${section === 'openingSoon' ? '/upcoming' : ''}?lang=${langParam}&category=${category}&page=${page}&size=${size}`,
    method: 'GET',
  });
  return response;
};
