'use client';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'i18n/navigation';
import { checkIsLoggedIn, logout as logoutAction } from 'utils/action/auth';

export function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isUserLoggedIn = await checkIsLoggedIn();
        setIsLoggedIn(isUserLoggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const logout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    queryClient.removeQueries({ queryKey: ['auth'] });
    setIsLoggedIn(false);
    setIsLoggingOut(false);
    router.push('/');
  };

  return {
    isLoggedIn,
    logout,
    isLoggingOut,
  };
}
