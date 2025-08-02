import React, { PropsWithChildren } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@lococo/design-system/dialog';
import { cn } from '@lococo/utils';

interface PopUpModalProps extends PropsWithChildren {
  className?: string;
}

interface PopUpModalTriggerProps extends PropsWithChildren {
  asChild?: boolean;
}

interface PopUpModalContentProps extends PropsWithChildren {
  className?: string;
}

interface PopUpModalHeaderProps extends PropsWithChildren {
  className?: string;
}

interface PopUpModalBodyProps extends PropsWithChildren {
  className?: string;
}

interface PopUpModalFooterProps extends PropsWithChildren {
  className?: string;
}

function PopUpModal({ children, className }: PopUpModalProps) {
  return (
    <div className={className}>
      <Dialog>{children}</Dialog>
    </div>
  );
}

function PopUpModalTrigger({
  children,
  asChild = true,
}: PopUpModalTriggerProps) {
  return <DialogTrigger asChild={asChild}>{children}</DialogTrigger>;
}

function PopUpModalContent({ children, className }: PopUpModalContentProps) {
  return (
    <DialogContent
      className={cn(
        'flex w-[40rem] max-w-none flex-col overflow-hidden',
        className
      )}
      showCloseButton={false}
    >
      {children}
    </DialogContent>
  );
}

function PopUpModalHeader({ children, className }: PopUpModalHeaderProps) {
  return (
    <header
      className={cn(
        'flex h-[4.8rem] shrink-0 items-center gap-[1rem] self-stretch border-b border-pink-500',
        className
      )}
    >
      <DialogTitle className="sr-only">Modal</DialogTitle>
      {children}
    </header>
  );
}

function PopUpModalBody({ children, className }: PopUpModalBodyProps) {
  return (
    <div
      className={cn('mb-[1.6rem] flex flex-1 flex-col gap-[0.8rem]', className)}
    >
      {children}
    </div>
  );
}

function PopUpModalFooter({ children, className }: PopUpModalFooterProps) {
  return (
    <DialogFooter className={cn('mt-[0.8rem] flex', className)}>
      {children}
    </DialogFooter>
  );
}

PopUpModal.Trigger = PopUpModalTrigger;
PopUpModal.Content = PopUpModalContent;
PopUpModal.Header = PopUpModalHeader;
PopUpModal.Body = PopUpModalBody;
PopUpModal.Footer = PopUpModalFooter;

export default PopUpModal;
