'use client';

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import {
  CustomerFormSections,
  SignupFormLayout,
} from '../../../../../components/forms';
import { ConfirmSignupModal } from '../components/confirm-signup-modal';
import { useCustomerForm } from './hooks/useCustomerForm';

export default function CustomerSignupPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('customerSignup.layout');
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const { form, handleBack, handleNext, handleIdCheckResult } =
    useCustomerForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    const isSuccess = await handleNext(data);
    if (isSuccess) {
      setIsShowConfirmModal(true);
    }
  });
  const handleConfirmModalConfirm = () => {
    router.push('/');
  };

  return (
    <>
      <SignupFormLayout
        title={t('title')}
        backLabel={t('back')}
        onBack={handleBack}
        onSubmit={handleSubmit}
        isValid={form.formState.isValid}
        submitLabel={t('signup')}
      >
        <CustomerFormSections
          form={form}
          locale={locale}
          onIdCheckResult={handleIdCheckResult}
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
