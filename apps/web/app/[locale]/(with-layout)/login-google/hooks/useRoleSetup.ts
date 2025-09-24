import { useEffect } from 'react';

import { useLocale } from 'next-intl';
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
  const locale = useLocale();

  useEffect(() => {
    const handleSetup = async () => {
      const storedRole = getRoleFromLocalStorage();
      if (storedRole) {
        try {
          await setUserRole(storedRole);
          clearRoleFromLocalStorage();

          const roleRoutes = {
            creator: () => router.replace(`/${locale}/sign-up/creator`),
            brand: () => router.replace(`/${locale}/sign-up/brand`),
            user: () => options?.onUserRoleSet?.(),
          };

          const routeHandler = roleRoutes[storedRole];
          if (routeHandler) {
            routeHandler();
          }
        } catch {
          clearRoleFromLocalStorage();
          router.replace(`/${locale}`);
        }
      }
    };

    handleSetup();
  }, [router, options, locale]);
};
