import {
  ApiResponseCampaignBasicResponse,
  CampaignDraftRequest,
  CampaignPublishRequest,
} from '@typescript-swagger/data-contracts';
import { apiRequest } from 'app/api/apiRequest';

export const getSavedCampaignForm = async (campaignId: string) => {
  const response = await apiRequest<ApiResponseCampaignBasicResponse>({
    endPoint: `/api/brands/my/campaigns/drafts/${campaignId}`,
  });
  return response;
};

export const saveCampaignForm = async (
  formData: CampaignDraftRequest
): Promise<ApiResponseCampaignBasicResponse> => {
  const response = await apiRequest<ApiResponseCampaignBasicResponse>({
    endPoint: '/api/brands/my/campaigns/drafts',
    method: 'POST',
    data: formData,
  });
  return response;
};

export const reSaveCampaignForm = async (
  formData: CampaignDraftRequest,
  id: string
): Promise<ApiResponseCampaignBasicResponse> => {
  const response = await apiRequest<ApiResponseCampaignBasicResponse>({
    endPoint: `/api/brands/my/campaigns/${id}/draft`,
    method: 'PUT',
    data: formData,
  });
  return response;
};

export const submitCampaignForm = async (
  formData: CampaignPublishRequest
): Promise<ApiResponseCampaignBasicResponse> => {
  const response = await apiRequest<ApiResponseCampaignBasicResponse>({
    endPoint: '/api/brands/my/campaigns/publish',
    method: 'POST',
    data: formData,
  });
  return response;
};

export const submitSavedCampaignForm = async (
  formData: CampaignPublishRequest,
  id: string
): Promise<ApiResponseCampaignBasicResponse> => {
  const response = await apiRequest<ApiResponseCampaignBasicResponse>({
    endPoint: `/api/brands/my/campaigns/${id}/publish`,
    method: 'PATCH',
    data: formData,
  });
  console.log(response, 'response');
  return response;
};
