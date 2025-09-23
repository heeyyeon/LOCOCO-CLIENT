import { apiRequest } from '../../../../api/apiRequest';
import { type UserRole } from './role-storage';

export const setUserRole = async (role: UserRole): Promise<boolean> => {
  const roleMapping: Record<UserRole, string> = {
    creator: 'CREATOR',
    brand: 'BRAND',
    user: 'CUSTOMER',
  };

  const response = await apiRequest<{ success: boolean }>({
    endPoint: '/api/auth/role',
    method: 'POST',
    data: { role: roleMapping[role] },
  });

  return response.success;
};
