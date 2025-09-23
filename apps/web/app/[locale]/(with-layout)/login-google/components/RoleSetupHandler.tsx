'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { UserInductionModal } from '../../../../../components/sign-up/user-induction-modal';
import { useRoleSetup } from '../hooks/useRoleSetup';

export function RoleSetupHandler() {
  const router = useRouter();
  const [isInductionModalOpen, setIsInductionModalOpen] = useState(false);

  useRoleSetup({
    onUserRoleSet: () => {
      setIsInductionModalOpen(true);
    },
  });

  const handleCancel = () => {
    setIsInductionModalOpen(false);
  };

  const handleConfirm = () => {
    setIsInductionModalOpen(false);
    router.push('/sign-up/creator');
  };

  return (
    <UserInductionModal
      open={isInductionModalOpen}
      onOpenChange={setIsInductionModalOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
}
