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
        <DialogTitle className="sr-only">Successfully Submitted!</DialogTitle>

        <ModalHeader text="Successfully Submitted!" />

        <section className="bg-white px-[4rem] py-[7rem]">
          <div className="text-center">
            <p className="inter-body3 font-medium text-gray-800">
              Your application was successfully submitted. <br />
              We&apos;ll email you the result within 24 hours.
            </p>
          </div>
        </section>

        <ModalButton text="Okay" onClick={handleConfirmModal} />
      </DialogContent>
    </Dialog>
  );
}
