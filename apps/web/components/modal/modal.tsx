import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps extends PropsWithChildren {
  className?: string;
}

function ModalHeader({ children, className }: ModalProps) {
  return (
    <header
      className={cn(
        'fixed flex h-[4.8rem] shrink-0 items-center gap-[1rem] self-stretch border-b border-pink-500 p-[0.8rem] pl-[1.6rem]',
        className
      )}
    >
      {children}
    </header>
  );
}

function ModalBody({ children, className }: ModalProps) {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
}

function ModalFooter({ children, className }: ModalProps) {
  return (
    <div
      className={cn(
        'bottom-0 flex',
        className
      )}
    >
      {children}
    </div>
  );
}

function Modal({ children, className }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-colors">
      <dialog
        className={cn(
          'relative z-50 flex flex-col bg-white rounded-[0.8rem] overflow-hidden',
          className
        )}
      >
        {children}
      </dialog>
    </div>
  );
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
