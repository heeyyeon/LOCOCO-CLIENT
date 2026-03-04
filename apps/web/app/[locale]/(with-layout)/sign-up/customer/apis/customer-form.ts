import { apiRequest } from '../../../../../api/apiRequest';
import {
  CustomerInfoResponse,
  CustomerRegisterRequest,
  CustomerRegisterResponse,
} from '../types/customer-form';

export const registerCustomerInfo = async (
  data: CustomerRegisterRequest
): Promise<CustomerRegisterResponse> => {
  return apiRequest<CustomerRegisterResponse>({
    endPoint: '/api/customer/profile',
    method: 'PATCH',
    data,
  });
};

export const getCustomerInfo = async (): Promise<CustomerInfoResponse> => {
  return apiRequest<CustomerInfoResponse>({
    endPoint: '/api/customer/profile',
    method: 'GET',
  });
};
