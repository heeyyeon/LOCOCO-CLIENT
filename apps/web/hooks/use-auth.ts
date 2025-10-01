'use client';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { checkIsLoggedIn, logout as logoutAction } from 'utils/action/auth';

export function useAuth() {
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
  };

  return {
    isLoggedIn,
    logout,
    isLoggingOut,
  };
}
