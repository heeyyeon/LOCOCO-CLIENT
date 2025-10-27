'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { SelectRoleModal } from '../../../../../components/sign-up/select-role-modal';
import { UserInductionModal } from '../../../../../components/sign-up/user-induction-modal';
import { useRoleSetup } from '../hooks/useRoleSetup';
import { type UserRole, saveRoleToLocalStorage } from '../utils/role-storage';

export function RoleSetupHandler() {
  const router = useRouter();
  const [isInductionModalOpen, setIsInductionModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  useRoleSetup({
    onUserRoleSet: (role?: UserRole) => {
      if (role === 'PENDING') {
        setIsRoleModalOpen(true);
      } else {
        setIsInductionModalOpen(true);
      }
    },
  });

  const handleCancel = () => {
    setIsInductionModalOpen(false);
  };

  const handleConfirm = () => {
    setIsInductionModalOpen(false);
    saveRoleToLocalStorage('CREATOR');
    router.push('/sign-up/creator');
  };

  const handleRoleSelect = (role: 'creator' | 'brand' | 'user') => {
    const roleMapping: Record<string, UserRole> = {
      creator: 'CREATOR',
      brand: 'BRAND',
      user: 'CUSTOMER',
    };

    const selectedRole = roleMapping[role];
    if (selectedRole) {
      saveRoleToLocalStorage(selectedRole);
      setIsRoleModalOpen(false);
      router.push('/login-google?mode=signup');
    }
  };

  return (
    <>
      <UserInductionModal
        open={isInductionModalOpen}
        onOpenChange={setIsInductionModalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <SelectRoleModal
        open={isRoleModalOpen}
        onOpenChange={setIsRoleModalOpen}
        onSelectRole={handleRoleSelect}
      />
    </>
  );
}
