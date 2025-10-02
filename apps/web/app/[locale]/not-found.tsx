'use client';

import { useTranslations } from 'next-intl';

import { useRouter } from 'i18n/navigation';

import { Button } from '@lococo/design-system/button';
import { SvgAlert } from '@lococo/icons';

export default function NotFound() {
  const t = useTranslations('errorPage');
  const router = useRouter();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-[29.6rem] flex-col items-center justify-center gap-[6.8rem]">
        <div className="flex flex-col items-center justify-center gap-[2.2rem]">
          <SvgAlert className="text-pink-300" size={120} />
          <p className="body1 font-bold text-gray-800">
            {t('errorPageMessage')}
          </p>
        </div>
        <Button
          variant="filled"
          color="primary"
          size="md"
          onClick={() => router.push('/')}
        >
          {t('backToHome')}
        </Button>
      </div>
    </div>
  );
}
