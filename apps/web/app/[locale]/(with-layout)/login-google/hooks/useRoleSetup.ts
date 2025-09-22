import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { setUserRole } from '../utils/role-api';
import {
  clearRoleFromLocalStorage,
  getRoleFromLocalStorage,
} from '../utils/role-storage';

interface UseRoleSetupOptions {
  onUserRoleSet?: () => void;
}

export const useRoleSetup = (options?: UseRoleSetupOptions) => {
  const router = useRouter();

  useEffect(() => {
    const handleSetup = async () => {
      const storedRole = getRoleFromLocalStorage();
      if (storedRole) {
        try {
          await setUserRole(storedRole);
          clearRoleFromLocalStorage();

          const roleRoutes = {
            creator: () => router.push('/sign-up/creator'),
            brand: () => router.push('/sign-up/brand'),
            user: () => options?.onUserRoleSet?.(),
          };

          const routeHandler = roleRoutes[storedRole];
          if (routeHandler) {
            routeHandler();
          }
        } catch {
          clearRoleFromLocalStorage();
        }
      }
    };

    handleSetup();
  }, [router, options]);
};
