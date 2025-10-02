import { GoogleLoginResponse } from 'swagger-codegen/data-contracts';

import { apiRequest } from '../../../../api/apiRequest';
import { type UserRole } from './role-storage';

interface RoleApiResponse {
  success: boolean;
  status: number;
  message: string;
  data: GoogleLoginResponse;
}

export const setUserRole = async (
  role: UserRole
): Promise<RoleApiResponse['data']> => {
  const roleMapping: Record<UserRole, string> = {
    PENDING: 'PENDING',
    CUSTOMER: 'CUSTOMER',
    CREATOR: 'CREATOR',
    BRAND: 'BRAND',
    ADMIN: 'ADMIN',
  };

  const response = await apiRequest<RoleApiResponse>({
    endPoint: '/api/auth/role',
    method: 'POST',
    data: { role: roleMapping[role] },
  });

  if (!response.success) {
    throw new Error('Role 설정에 실패했습니다.');
  }

  return response.data;
};
