import { isLogin } from 'components/card/action/auth';
import { useState, useEffect } from 'react';

interface UseAuthReturn {
  isLoggedIn: boolean | null;
}

export function useAuth(): UseAuthReturn {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await isLogin();
        setIsLoggedIn(loginStatus);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return {
    isLoggedIn,
  };
}
