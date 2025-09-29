import { ApiResponseCampaignMediaResponse } from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

export const getPresignedUrl = async (fileTypes: string[]) => {
  const response = await apiRequest<ApiResponseCampaignMediaResponse>({
    endPoint: '/api/campaigns/media',
    method: 'POST',
    data: { mediaType: fileTypes },
  });
  return response.data;
};
