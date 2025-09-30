'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@lococo/design-system/dialog';
import { ModalButton } from '@lococo/design-system/modal-button';
import { ModalHeader } from '@lococo/design-system/modal-header';

interface ConfirmCampaignSignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  announcementDate: string;
}

export function ConfirmCampaignSignUpModal({
  open,
  onOpenChange,
  onConfirm,
  announcementDate,
}: ConfirmCampaignSignUpModalProps) {
  const t = useTranslations('campaignDetail.confirmCampaignSignUpModal');
  const params = useParams();
  const locale = params.locale;
  const guidelinesUrl = `/${locale}/how-it-work`;
  const handleConfirmModal = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        className="fixed left-1/2 top-1/2 w-full max-w-[55rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[3.2rem] p-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{t('title')}</DialogTitle>

        <ModalHeader text={t('title')} />

        <section className="bg-white px-[4rem] py-[4rem]">
          {/* TODO: 아이콘 추가 */}
          <div className="flex flex-col items-center gap-[0.8rem] text-center">
            <p className="body3 whitespace-pre-line font-medium text-gray-800">
              {t.rich('description', {
                announcementDate,
                bold: () => (
                  <span className="font-bold">{announcementDate}</span>
                ),
                link: (chunks) => (
                  <a
                    href={guidelinesUrl}
                    target="_blank"
                    className="text-blue underline hover:cursor-pointer"
                    rel="noreferrer"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p className="body3 whitespace-pre-line font-medium text-gray-800">
              {t('finalDescription')}
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
