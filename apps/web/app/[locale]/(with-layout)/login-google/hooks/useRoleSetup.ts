import { useCallback, useEffect, useRef } from 'react';

import { useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { apiRequest } from 'app/api/apiRequest';

import { setUserRole } from '../utils/role-api';
import {
  UserRole,
  clearRoleFromLocalStorage,
  getRoleFromLocalStorage,
  saveRoleToLocalStorage,
} from '../utils/role-storage';

interface UseRoleSetupOptions {
  onUserRoleSet?: () => void;
}

export const useRoleSetup = (options?: UseRoleSetupOptions) => {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const isSetupCompleted = useRef(false);

  const getRoleRoutes = useCallback(
    () => ({
      creator: () => router.replace(`/${locale}/sign-up/creator`),
      brand: () => router.replace(`/${locale}/sign-up/brand`),
      user: () => options?.onUserRoleSet?.(),
    }),
    [router, locale, options]
  );

  const handleLoginStatus = useCallback(
    (loginStatus: string, role: UserRole) => {
      const roleRoutes = getRoleRoutes();

      switch (loginStatus) {
        case 'LOGIN':
          router.replace(`/${locale}`);
          break;
        case 'INFO_REQUIRED':
          if (role === 'user') {
            router.replace(`/${locale}`);
          } else {
            const routeHandler = roleRoutes[role];
            routeHandler?.();
          }
          break;
        case 'SNS_REQUIRED':
          router.replace(`/${locale}/my-page/connect-sns`);
          break;
        case 'REGISTER': {
          const signupRoute = roleRoutes[role];
          signupRoute?.();
          break;
        }
        default:
          router.replace(`/${locale}`);
          break;
      }
    },
    [router, locale, getRoleRoutes]
  );

  const processRoleSetup = useCallback(
    async (role: UserRole) => {
      try {
        const roleResponse = await setUserRole(role);
        handleLoginStatus(roleResponse.loginStatus, role);
      } catch {
        clearRoleFromLocalStorage();
        router.replace(`/${locale}`);
      }
    },
    [router, locale, handleLoginStatus]
  );

  const handleUrlRole = useCallback(async () => {
    const urlRole = searchParams.get('role') as UserRole | null;
    if (!urlRole) return false;

    saveRoleToLocalStorage(urlRole);
    await processRoleSetup(urlRole);
    return true;
  }, [searchParams, processRoleSetup]);

  const handleLoggedInUser = useCallback(async () => {
    const hasAccessToken = document.cookie.includes('AccessToken=');
    if (!hasAccessToken) return false;

    try {
      const userInfo = await apiRequest<{
        data?: { role?: string };
      }>({
        endPoint: '/api/auth/name',
      });

      if (!userInfo?.data?.role) return true;

      const { role } = userInfo.data;

      if (role === 'PENDING') {
        const storedRole = getRoleFromLocalStorage();
        if (storedRole) {
          await processRoleSetup(storedRole);
        } else {
          options?.onUserRoleSet?.();
        }
      } else {
        router.replace(`/${locale}`);
      }
    } catch {
      const storedRole = getRoleFromLocalStorage();
      if (storedRole) {
        await processRoleSetup(storedRole);
      } else {
        router.replace(`/${locale}`);
      }
    }
    return true;
  }, [options, router, locale, processRoleSetup]);

  const handleSignupMode = useCallback(async () => {
    const storedRole = getRoleFromLocalStorage();
    if (storedRole) {
      await processRoleSetup(storedRole);
    }
  }, [processRoleSetup]);

  useEffect(() => {
    if (isSetupCompleted.current) return;

    const handleSetup = async () => {
      if (await handleUrlRole()) return;
      if (await handleLoggedInUser()) return;
      await handleSignupMode();
    };

    handleSetup();
    isSetupCompleted.current = true;
  }, [handleUrlRole, handleLoggedInUser, handleSignupMode]);
};
