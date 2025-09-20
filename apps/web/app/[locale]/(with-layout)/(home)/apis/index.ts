import { apiRequest } from 'app/api/apiRequest';
import { CategoryValue } from 'types/category';

interface GetCampaignProps {
  section: 'KBeauty' | 'openingSoon';
  category: CategoryValue;
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
}: GetCampaignProps) => {
  const langParam = locale.toUpperCase();

  const response = await apiRequest({
    endPoint: `/api/campaigns${section === 'openingSoon' ? '/upcoming' : ''}?lang=${langParam}&category=${category}&page=${page}&size=${size}`,
    method: 'GET',
  });

  return response;
};
