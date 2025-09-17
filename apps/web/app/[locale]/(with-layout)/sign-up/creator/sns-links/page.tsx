'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import {
  SignupFormLayout,
  SnsConnection,
} from '../../../../../../components/forms';
import { ConfirmSignupModal } from '../../../../../../components/sign-up/confirm-signup-modal';

export default function CreatorSnsLinksPage() {
  const router = useRouter();
  const t = useTranslations('creatorSnsLinksPage');

  const [connectedSns, setConnectedSns] = useState<('instagram' | 'tiktok')[]>(
    []
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  const handleConnectSns = (sns: 'instagram' | 'tiktok') => {
    setConnectedSns((prev) => [...prev, sns]);
  };

  const hasConnectedAccount = connectedSns.length > 0;

  const handleSubmit = () => {
    if (!hasConnectedAccount) {
      setIsSubmitted(true);
      return;
    }

    setIsShowConfirmModal(true);
  };

  const handleConfirmModalConfirm = () => {
    router.push('/');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <SignupFormLayout
        title={t('title')}
        onBack={handleBack}
        onSubmit={handleSubmit}
        isValid={hasConnectedAccount}
        submitLabel={t('submitLabel')}
        isBackDisabled={false}
      >
        <SnsConnection
          description={t('snsDescription')}
          connectedSns={connectedSns}
          onConnectSns={handleConnectSns}
          hasError={isSubmitted}
        />
      </SignupFormLayout>

      <ConfirmSignupModal
        open={isShowConfirmModal}
        onOpenChange={setIsShowConfirmModal}
        onConfirm={handleConfirmModalConfirm}
      />
    </>
  );
}
