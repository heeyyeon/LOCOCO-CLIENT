import { useTranslations } from 'next-intl';

import { SvgInstagram, SvgTiktok } from '@lococo/icons';
import { cn } from '@lococo/utils';

import { ContentSubmissionsFormData } from '../../hooks/use-content-submissions';

interface ContentTypeSelectProps {
  formData: ContentSubmissionsFormData;
  errors: string | undefined;
}

export default function ContentTypeSelect({
  formData,
}: ContentTypeSelectProps) {
  const t = useTranslations('myPage.contentSubmissions.contentTypeSelect');
  const currentContentType = formData.contentPlatform;
  console.log(currentContentType);
  const CONTENT_TYPES = [
    {
      label: t('instagramPost'),
      value: 'INSTA_POST',
      icon: <SvgInstagram size={20} />,
    },
    {
      label: t('instagramReels'),
      value: 'INSTA_REELS',
      icon: <SvgInstagram size={20} />,
    },
    {
      label: t('tiktokVideo'),
      value: 'TIKTOK_VIDEO',
      icon: <SvgTiktok size={20} />,
    },
  ] as const;

  const getButtonClassName = (value: string) =>
    cn(
      'body1 flex items-center gap-[0.5rem] rounded-[2.4rem] border border-gray-400 px-[1.6rem] py-[0.6rem] transition-colors',
      currentContentType === value &&
        'border-pink-500 bg-pink-100 text-pink-500'
    );

  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <p className="title2 text-gray-800">{t('title')}</p>
      <div className="flex gap-[1.2rem]">
        {CONTENT_TYPES.map(({ label, value, icon: Icon }) => (
          <div key={value} className={getButtonClassName(value)}>
            {Icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
