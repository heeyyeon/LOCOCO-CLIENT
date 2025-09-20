import React from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@lococo/design-system/dialog';
import { ModalButton } from '@lococo/design-system/modal-button';
import { ModalHeader } from '@lococo/design-system/modal-header';

interface AddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressModal({ open, onOpenChange }: AddressModalProps) {
  const router = useRouter();
  const t = useTranslations('myPage.addressModal');

  const handleEditModal = () => {
    onOpenChange(false);
    router.push('/my-page?tab=edit-profile&returnTo=address-modal');
  };

  const handleGetDeliveryModal = () => {
    onOpenChange(false);
    // TODO: 모달 닫히고 마이페이지의 캠페인 카드 버튼이 confirm address에서 upload 1st review로 바뀜
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[55rem] items-center overflow-hidden rounded-[3.2rem] p-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Address</DialogTitle>

        <ModalHeader text="Missing required fields" />

        <section className="flex h-[52rem] flex-col gap-[1.6rem] overflow-y-auto bg-white p-[4rem]">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="title2 text-gray-800">{t('title')}</p>
            <p className="caption3 text-gray-500">{t('description')}</p>
          </div>
        </section>
        <div className="flex items-center border-t border-pink-500">
          <ModalButton
            text={t('edit')}
            variant="left"
            onClick={handleEditModal}
          />
          <div className="h-[5.6rem] w-[2px] bg-pink-500" />
          <ModalButton
            text={t('getDelivery')}
            variant="right"
            onClick={handleGetDeliveryModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
