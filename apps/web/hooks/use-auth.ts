import { useEffect, useState } from 'react';

import { checkIsLoggedIn } from 'utils/action/auth';

interface UseAuthReturn {
  isLoggedIn: boolean | null;
}

export function useAuth(): UseAuthReturn {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

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

  return {
    isLoggedIn,
  };
}
