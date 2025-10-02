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

interface DeliveryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeliveryModal({ open, onOpenChange }: DeliveryModalProps) {
  const t = useTranslations('brandFeedback.deliveryFormModal');
  const router = useRouter();

  const handleDeliveryModal = () => {
    onOpenChange(false);
    router.push('/brand/campaign');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[55rem] items-center overflow-hidden rounded-[3.2rem] p-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Save Form</DialogTitle>

        <ModalHeader text={t('title')} />

        <section className="flex min-h-[20rem] items-center justify-center bg-white p-[4rem]">
          <p className="body3 text-gray-800">{t('description')}</p>
        </section>
        <div className="flex items-center border-t border-pink-500">
          <ModalButton text={t('save')} onClick={handleDeliveryModal} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
