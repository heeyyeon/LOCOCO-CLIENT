import { useTranslations } from 'next-intl';

import { Button } from '@lococo/design-system/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@lococo/design-system/dialog';
import { ModalHeader } from '@lococo/design-system/modal-header';
import { SvgClose } from '@lococo/icons';

type Role = 'creator' | 'brand' | 'user';

interface SelectRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectRole: (role: Role) => void;
}

export function SelectRoleModal({
  open,
  onOpenChange,
  onSelectRole,
}: SelectRoleModalProps) {
  const t = useTranslations('SelectRoleModal');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[55rem] overflow-hidden rounded-[3.2rem] p-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{t('title')}</DialogTitle>

        <ModalHeader
          text={t('title')}
          rightContent={
            <button
              type="button"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              className="text-gray-500"
            >
              <SvgClose />
            </button>
          }
        />

        <section className="bg-white px-[4rem] py-[4rem]">
          <header className="mb-[4.4rem] text-center">
            <h1 className="inter-head3 mb-[0.4rem] font-bold text-pink-500">
              {t('welcomeTitle')}
            </h1>
            <p className="inter-body3 font-medium text-gray-800">
              {t('description')}
            </p>
          </header>

          <div className="space-y-[1.2rem]">
            {(['creator', 'brand', 'user'] as const).map((role) => {
              return (
                <Button
                  key={role}
                  variant="outline"
                  color="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    onSelectRole(role);
                    onOpenChange(false);
                  }}
                >
                  {t('loginAs')} {t(`roles.${role}`)}
                </Button>
              );
            })}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
