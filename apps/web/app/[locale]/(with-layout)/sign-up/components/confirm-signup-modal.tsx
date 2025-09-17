'use client';

import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@lococo/design-system/dialog';
import { ModalButton } from '@lococo/design-system/modal-button';
import { ModalHeader } from '@lococo/design-system/modal-header';

interface ConfirmSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmSignupModal({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmSignupModalProps) {
  const t = useTranslations('confirmSignupModal');

  const handleConfirmModal = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[55rem] overflow-hidden rounded-[3.2rem] p-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{t('title')}</DialogTitle>

        <ModalHeader text={t('title')} />

        <section className="bg-white px-[4rem] py-[7rem]">
          <div className="text-center">
            <p className="body3 whitespace-pre-line font-medium text-gray-800">
              {t('message')}
            </p>
          </div>
        </section>

        <div className="border-t border-pink-500">
          <ModalButton text={t('confirmButton')} onClick={handleConfirmModal} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
