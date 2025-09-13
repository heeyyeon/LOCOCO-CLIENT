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
  const confirmSignupModal = useTranslations('ConfirmSignupModal');

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
        <DialogTitle className="sr-only">
          {confirmSignupModal('title')}
        </DialogTitle>

        <ModalHeader text={confirmSignupModal('title')} />

        <section className="bg-white px-[4rem] py-[7rem]">
          <div className="text-center">
            <p
              className="inter-body3 font-medium text-gray-800"
              dangerouslySetInnerHTML={{
                __html: confirmSignupModal('message'),
              }}
            />
          </div>
        </section>

        <ModalButton
          text={confirmSignupModal('confirmButton')}
          onClick={handleConfirmModal}
        />
      </DialogContent>
    </Dialog>
  );
}
