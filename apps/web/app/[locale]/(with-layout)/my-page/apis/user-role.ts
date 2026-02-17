import { apiRequest } from 'app/api/apiRequest';

export type MyPageUserRole =
  | 'PENDING'
  | 'CUSTOMER'
  | 'CREATOR'
  | 'BRAND'
  | 'ADMIN'
  | null;

interface UserNameResponse {
  data?: {
    role?: MyPageUserRole;
  };
}

export const getMyPageUserRole = async (): Promise<MyPageUserRole> => {
  try {
    const response = await apiRequest<UserNameResponse>({
      endPoint: '/api/user/name',
    });

    return response?.data?.role ?? null;
  } catch {
    return null;
  }
};
