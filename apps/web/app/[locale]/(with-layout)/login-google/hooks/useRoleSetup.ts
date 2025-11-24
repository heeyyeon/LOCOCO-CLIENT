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
  onUserRoleSet?: (role?: UserRole) => void;
}

export const useRoleSetup = (options?: UseRoleSetupOptions) => {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const isSetupCompleted = useRef(false);

  const getRoleRoutes = useCallback(
    () => ({
      CREATOR: () => router.replace(`/${locale}/sign-up/creator`),
      BRAND: () => router.replace(`/${locale}/sign-up/brand`),
      CUSTOMER: () => router.replace(`/${locale}`),
      ADMIN: () => router.replace(`/${locale}`),
      PENDING: () => options?.onUserRoleSet?.('PENDING'),
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
          if (role === 'CUSTOMER' || role === 'ADMIN') {
            router.replace(`/${locale}`);
          } else {
            const routeHandler = roleRoutes[role];
            routeHandler?.();
          }
          break;
        case 'SNS_REQUIRED':
          router.replace(`/${locale}/sign-up/creator/sns-links`);
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
    const urlRole = searchParams.get('role') as string | null;
    if (!urlRole) return false;

    const roleMapping: Record<string, UserRole> = {
      creator: 'CREATOR',
      brand: 'BRAND',
      user: 'CUSTOMER',
    };

    const mappedRole = roleMapping[urlRole.toLowerCase()];
    if (!mappedRole) return false;

    saveRoleToLocalStorage(mappedRole);
    await processRoleSetup(mappedRole);
    return true;
  }, [searchParams, processRoleSetup]);

  const handleLoggedInUser = useCallback(async () => {
    const hasAccessToken = document.cookie.includes('AccessToken=');
    if (!hasAccessToken) return false;

    const mode = searchParams.get('mode');
    if (mode === 'signup') return false;

    try {
      const userInfo = await apiRequest<{
        data?: { role?: string };
      }>({
        endPoint: '/api/user/name',
      });

      if (!userInfo?.data?.role) return true;

      const { role } = userInfo.data;

      if (role === 'PENDING') {
        const storedRole = getRoleFromLocalStorage();
        if (storedRole) {
          await processRoleSetup(storedRole);
        } else {
          options?.onUserRoleSet?.('PENDING');
        }
      } else if (role === 'CUSTOMER') {
        const storedRole = getRoleFromLocalStorage();
        if (storedRole === 'CUSTOMER') {
          options?.onUserRoleSet?.('CUSTOMER');
        } else {
          router.replace(`/${locale}`);
        }
      } else {
        const roleAsUserRole = role as UserRole;
        try {
          await processRoleSetup(roleAsUserRole);
        } catch (error) {
          if (error instanceof Error && error.message.includes('400')) {
            router.replace(`/${locale}`);
          } else {
            clearRoleFromLocalStorage();
            router.replace(`/${locale}`);
          }
        }
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
  }, [options, router, locale, processRoleSetup, searchParams]);

  const handleSignupMode = useCallback(async () => {
    const mode = searchParams.get('mode');
    if (mode !== 'signup') return;

    const storedRole = getRoleFromLocalStorage();
    if (storedRole) {
      await processRoleSetup(storedRole);
    }
  }, [processRoleSetup, searchParams]);

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
