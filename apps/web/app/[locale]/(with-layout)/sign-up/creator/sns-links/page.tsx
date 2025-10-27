'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormLayout, SnsConnection } from 'components/forms';
import LoadingSvg from 'components/loading/loading-svg';
import { useConnectSns, useOAuthCallback } from 'hooks/use-connect-sns';

import { ConfirmSignupModal } from '../../components/confirm-signup-modal';
import {
  completeCreatorSignup,
  registerCreatorSnsLink,
} from '../apis/creator-form';
import { snsLinksSchema } from '../utils/signup';

export default function CreatorSnsLinksPage() {
  const router = useRouter();
  const t = useTranslations('creatorSnsLinksPage');
  const tValidation = useTranslations('snsConnection');

  const { isProcessingCallback } = useOAuthCallback();
  const { isLoading } = useConnectSns();
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(snsLinksSchema(tValidation)),
    mode: 'onSubmit',
    defaultValues: {
      instagramUrl: '',
      tiktokUrl: '',
    },
  });

  const instagramUrl = form.watch('instagramUrl');
  const tiktokUrl = form.watch('tiktokUrl');
  const hasConnectedAccount = Boolean(instagramUrl || tiktokUrl);

  const handleSubmit = form.handleSubmit(async () => {
    if (!hasConnectedAccount) {
      form.setError('root', {
        message: tValidation('errorMessage'),
      });
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
  });

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
          hasError={
            !!form.formState.errors.instagramUrl ||
            !!form.formState.errors.tiktokUrl ||
            !!form.formState.errors.root
          }
          customErrorMessage={
            (form.formState.errors.root?.message ||
              form.formState.errors.instagramUrl?.message ||
              form.formState.errors.tiktokUrl?.message) as string | undefined
          }
          instagramUrl={instagramUrl}
          tiktokUrl={tiktokUrl}
          onInstagramChange={(value) => {
            form.setValue('instagramUrl', value);
            form.clearErrors('instagramUrl');
          }}
          onTiktokChange={(value) => {
            form.setValue('tiktokUrl', value);
            form.clearErrors('tiktokUrl');
          }}
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
