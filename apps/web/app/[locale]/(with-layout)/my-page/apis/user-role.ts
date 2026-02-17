import { apiRequest } from 'app/api/apiRequest';

export type MyPageUserRole =
  | 'PENDING'
  | 'CUSTOMER'
  | 'CREATOR'
  | 'BRAND'
  | 'ADMIN'
  | null;

export type ResolvedMyPageUserRole = Exclude<MyPageUserRole, null>;

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

export const getMyPageUserRoleOrThrow =
  async (): Promise<ResolvedMyPageUserRole> => {
    const role = await getMyPageUserRole();

    if (!role) {
      throw new Error('사용자 역할 조회에 실패했습니다.');
    }

    return role;
  };
