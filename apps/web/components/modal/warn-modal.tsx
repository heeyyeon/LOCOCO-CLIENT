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
  className?: string;
}

function WarnModal({ children, className }: WarnModalProps) {
  return (
    <div className={className}>
      <Dialog>{children}</Dialog>
    </div>
  );
}

function WarnModalTrigger({ children, asChild = true }: WarnModalTriggerProps) {
  return <DialogTrigger asChild={asChild}>{children}</DialogTrigger>;
}

function WarnModalContent({
  title = 'お知らせ',
  description = '近日中にご案内できるよう進めております。',
  confirmText = '確認',
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
          <h3>サービスを準備中です。</h3>
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

WarnModal.Trigger = WarnModalTrigger;
WarnModal.Content = WarnModalContent;

export default WarnModal;
