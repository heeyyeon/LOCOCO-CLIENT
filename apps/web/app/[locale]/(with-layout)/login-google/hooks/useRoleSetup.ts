import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { setUserRole } from '../utils/role-api';
import {
  clearRoleFromLocalStorage,
  getRoleFromLocalStorage,
} from '../utils/role-storage';

export const useRoleSetup = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSetup = async () => {
      const storedRole = getRoleFromLocalStorage();
      if (storedRole) {
        try {
          await setUserRole(storedRole);
          clearRoleFromLocalStorage();

          if (storedRole === 'creator') {
            router.push('/sign-up/creator');
          } else if (storedRole === 'brand') {
            router.push('/sign-up/brand');
          }
        } catch {
          clearRoleFromLocalStorage();
        }
      }
    };

    handleSetup();
  }, [router]);
};
