import { PropsWithChildren, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps extends PropsWithChildren {
  className?: string;
  onClose?: () => void;
}

function ModalHeader({ children, className }: ModalProps) {
  return (
    <header
      className={cn(
        'flex h-[4.8rem] shrink-0 items-center gap-[1rem] self-stretch border-b border-pink-500 py-[0.8rem] pl-[2rem] pr-[1.2rem]',
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
  return <div className={cn('bottom-0 flex', className)}>{children}</div>;
}

function Modal({ children, className, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-colors">
      <dialog
        className={cn(
          'relative flex flex-col overflow-hidden rounded-[0.8rem] bg-white',
          className
        )}
        onClick={(e) => e.stopPropagation()}
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
