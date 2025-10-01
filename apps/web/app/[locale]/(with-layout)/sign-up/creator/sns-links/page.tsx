'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { SignupFormLayout, SnsConnection } from 'components/forms';
import LoadingSvg from 'components/loading/loading-svg';
import { useConnectSns, useOAuthCallback } from 'hooks/use-connect-sns';

import { ConfirmSignupModal } from '../../components/confirm-signup-modal';
import { completeCreatorSignup } from '../apis/creator-form';

export default function CreatorSnsLinksPage() {
  const router = useRouter();
  const t = useTranslations('creatorSnsLinksPage');

  const { isProcessingCallback } = useOAuthCallback();
  const { data: snsData, isLoading } = useConnectSns();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  const connectedSns: ('instagram' | 'tiktok')[] = [];
  if (snsData?.data?.isInstaConnected) connectedSns.push('instagram');
  if (snsData?.data?.isTiktokConnected) connectedSns.push('tiktok');
  const hasConnectedAccount = connectedSns.length > 0;

  const handleSubmit = async () => {
    if (!hasConnectedAccount) {
      setIsSubmitted(true);
      return;
    }

    const response = await completeCreatorSignup();

    if (response.success) {
      setIsShowConfirmModal(true);
    }
  };

  const handleConfirmModalConfirm = () => {
    router.push('/');
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading || isProcessingCallback) {
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
        isValid={true}
        submitLabel={t('submitLabel')}
        isBackDisabled={false}
      >
        <SnsConnection
          description={t('snsDescription')}
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
