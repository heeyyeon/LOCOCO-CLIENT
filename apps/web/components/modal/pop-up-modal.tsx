import React from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components';

interface WarnModalProps {
  children: React.ReactNode;
  className?: string;
}

interface WarnModalTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface WarnModalContentProps {
  title?: string;
  description?: string;
  confirmText?: string;
  children?: React.ReactNode;
  subTitle?: string;
  className?: string;
}

function PopUpModal({ children, className }: WarnModalProps) {
  return (
    <div className={className}>
      <Dialog>{children}</Dialog>
    </div>
  );
}

function PopUpModalTrigger({
  children,
  asChild = true,
}: WarnModalTriggerProps) {
  return <DialogTrigger asChild={asChild}>{children}</DialogTrigger>;
}

function PopUpModalContent({
  title = 'お知らせ',
  description = '近日中にご案内できるよう進めております。',
  confirmText = '確認',
  subTitle,
  children,
  className,
}: WarnModalContentProps) {
  return (
    <DialogContent className={`sm:max-w-md ${className || ''}`}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      {children ? (
        children
      ) : (
        <>
          <Dialog>{subTitle}</Dialog>
          <DialogDescription>{description}</DialogDescription>
        </>
      )}

      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button size="lg" variant="filled" color="primary">
            {confirmText}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

PopUpModal.Trigger = PopUpModalTrigger;
PopUpModal.Content = PopUpModalContent;

export default PopUpModal;
