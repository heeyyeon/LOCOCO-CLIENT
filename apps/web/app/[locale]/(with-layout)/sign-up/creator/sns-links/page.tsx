'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { SignupFormLayout, SnsConnection } from 'components/forms';
import LoadingSvg from 'components/loading/loading-svg';

import { ConfirmSignupModal } from '../../components/confirm-signup-modal';
import { useSnsStatus } from './hooks/useSnsStatus';

export default function CreatorSnsLinksPage() {
  const router = useRouter();
  const t = useTranslations('creatorSnsLinksPage');

  const { connectedSns, isLoading, handleConnectSns } = useSnsStatus();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

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

  if (isLoading) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <LoadingSvg />
      </div>
    );
  }

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
