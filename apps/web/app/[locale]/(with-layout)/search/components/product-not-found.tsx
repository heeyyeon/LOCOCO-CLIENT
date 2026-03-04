import { useTranslations } from 'next-intl';

export default function ProductNotFoundSection() {
  const t = useTranslations('reviews');
  return (
    <div className="flex min-h-[50rem] w-full flex-col items-center justify-center py-[6rem]">
      <p className="body1 font-bold text-gray-800">{t('noProducts')}</p>
    </div>
  );
}
