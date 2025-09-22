export type UserRole = 'creator' | 'brand' | 'user';

const ROLE_STORAGE_KEY = 'selectedRole';

export const saveRoleToLocalStorage = (userRole: UserRole): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ROLE_STORAGE_KEY, userRole);
  }
};

export const getRoleFromLocalStorage = (): UserRole | null => {
  if (typeof window !== 'undefined') {
    const storedUserRole = localStorage.getItem(ROLE_STORAGE_KEY);
    return storedUserRole as UserRole | null;
  }
  return null;
};

export const clearRoleFromLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ROLE_STORAGE_KEY);
  }
};

export const hasRoleInLocalStorage = (): boolean => {
  return getRoleFromLocalStorage() !== null;
};
