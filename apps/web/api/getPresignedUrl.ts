import { apiRequest } from '../app/api/apiRequest';

interface MediaUrl {
  mediaUrl: string[];
}

interface ApiResponseCampaignMediaResponse {
  data: MediaUrl;
}

export const getPresignedUrl = async (fileTypes: string[]) => {
  const response = await apiRequest<ApiResponseCampaignMediaResponse>({
    endPoint: '/api/campaigns/media',
    method: 'POST',
    data: { mediaType: fileTypes },
  });
  return response.data;
};
