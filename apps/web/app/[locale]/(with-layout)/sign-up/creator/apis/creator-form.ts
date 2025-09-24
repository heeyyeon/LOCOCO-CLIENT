import { apiRequest } from '../../../../../api/apiRequest';
import {
  CreatorInfoResponse,
  CreatorRegisterRequest,
  CreatorRegisterResponse,
} from '../types/creator-form';

export const registerCreatorInfo = async (
  data: CreatorRegisterRequest
): Promise<CreatorRegisterResponse> => {
  return apiRequest<CreatorRegisterResponse>({
    endPoint: '/api/creator/register/info',
    method: 'PATCH',
    data,
  });
};

export const getCreatorInfo = async (): Promise<CreatorInfoResponse> => {
  return apiRequest<CreatorInfoResponse>({
    endPoint: '/api/creator/register/info',
    method: 'GET',
  });
};
