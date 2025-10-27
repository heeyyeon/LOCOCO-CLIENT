'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { SignupFormLayout, SnsConnection } from 'components/forms';
import LoadingSvg from 'components/loading/loading-svg';
import { useConnectSns, useOAuthCallback } from 'hooks/use-connect-sns';

import { ConfirmSignupModal } from '../../components/confirm-signup-modal';
import {
  completeCreatorSignup,
  registerCreatorSnsLink,
} from '../apis/creator-form';

export default function CreatorSnsLinksPage() {
  const router = useRouter();
  const t = useTranslations('creatorSnsLinksPage');

  const { isProcessingCallback } = useOAuthCallback();
  const { isLoading } = useConnectSns();
  const [instagramUrl, setInstagramUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  const hasConnectedAccount = Boolean(instagramUrl || tiktokUrl);

  const handleSubmit = async () => {
    if (!hasConnectedAccount) {
      setIsSubmitted(true);
      return;
    }

    await registerCreatorSnsLink({
      instaLink: instagramUrl ?? '',
      tiktokLink: tiktokUrl ?? '',
    });

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
          instagramUrl={instagramUrl}
          tiktokUrl={tiktokUrl}
          onInstagramChange={setInstagramUrl}
          onTiktokChange={setTiktokUrl}
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
