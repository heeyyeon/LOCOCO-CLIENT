import { useTranslations } from 'next-intl';

export default function ReviewNotFoundSection() {
  const t = useTranslations('reviews');
  return (
    <div className="flex min-h-[50rem] w-full flex-col items-center justify-center gap-[1.2rem] self-stretch py-[6rem]">
      <p className="body1 font-bold text-gray-800">{t('noReviews')}</p>
    </div>
  );
}
