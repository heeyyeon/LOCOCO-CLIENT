import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@lococo/design-system/dialog';
import { ModalButton } from '@lococo/design-system/modal-button';
import { ModalHeader } from '@lococo/design-system/modal-header';

interface UserInductionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function UserInductionModal({
  open,
  onOpenChange,
  onCancel,
  onConfirm,
}: UserInductionModalProps) {
  const userInductionModal = useTranslations('UserInductionModal');

  const handleCancelModal = () => {
    onCancel();
    onOpenChange(false);
  };

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
          {userInductionModal('title')}
        </DialogTitle>

        <ModalHeader text={userInductionModal('title')} />

        <section className="bg-white px-[4rem] py-[7rem]">
          <div className="text-center">
            <div className="inter-body3 font-medium text-gray-800">
              {userInductionModal
                .raw('message')
                .map((line: string, index: number) => (
                  <div key={index}>{line}</div>
                ))}
            </div>
          </div>
        </section>

        <div className="flex items-center border-t border-pink-500">
          <ModalButton
            text={userInductionModal('cancelButton')}
            variant="left"
            onClick={handleCancelModal}
          />
          <div className="h-[5.6rem] w-[2px] bg-pink-500" />
          <ModalButton
            text={userInductionModal('confirmButton')}
            variant="right"
            onClick={handleConfirmModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
