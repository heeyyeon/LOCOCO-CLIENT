import { useTranslations } from 'next-intl';

import { SvgInstagram } from 'node_modules/@lococo/design-system/src/icons/fill/components/Instagram';
import { SvgTiktok } from 'node_modules/@lococo/design-system/src/icons/fill/components/Tiktok';

import { cn } from '@lococo/utils';

import BrandNote from '../components/content-submissions/brand-note';

export default function FinalReview() {
  const t = useTranslations('myPage.finalReview');
  const CONTENT_TYPES = [
    {
      label: t('contentType.instagramPost'),
      value: 'INSTA_POST',
      icon: <SvgInstagram size={20} />,
    },
    {
      label: t('contentType.instagramReels'),
      value: 'INSTA_REELS',
      icon: <SvgInstagram size={20} />,
    },
    {
      label: t('contentType.tiktokVideo'),
      value: 'TIKTOK_VIDEO',
      icon: <SvgTiktok size={20} />,
    },
  ] as const;

  const getButtonClassName = (value: string) =>
    cn(
      'body1 flex items-center gap-[0.5rem] rounded-[2.4rem] border border-gray-400 px-[1.6rem] py-[0.6rem] transition-colors',
      'INSTA_POST' === value && 'border-pink-500 bg-pink-100 text-pink-500'
    );

  return (
    <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center gap-[8.4rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
      <div className="flex w-[84rem] flex-col items-start gap-[1.6rem] border border-gray-400 bg-white p-[4.8rem]">
        <FinalWrapper title={t('1stContent')}>
          <p className="body4 text-gray-500">하하</p>
        </FinalWrapper>
        <section className="flex w-full flex-col gap-[1.6rem]">
          <p className="title2 font-bold text-gray-800">
            {t('contentType.title')}
          </p>
          <div className="flex gap-[1.2rem]">
            {CONTENT_TYPES.map(({ label, value, icon: Icon }) => (
              <div key={value} className={getButtonClassName(value)}>
                {Icon}
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
        <FinalWrapper title={t('socialMediaContent')}>
          <p>하하</p>
        </FinalWrapper>

        <FinalWrapper title={t('submitContentUrl')}>
          <p>하하</p>
        </FinalWrapper>
        <FinalWrapper title={t('submitCaptionAndHashtags')}>
          <p>하하</p>
        </FinalWrapper>
      </div>
      <BrandNote round="FIRST" text={t('brandNote.1stContent')} />
    </div>
  );
}

function FinalWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-[1.6rem]">
      <p className="title2 font-bold text-gray-800">{title}</p>
      <div className="body4 flex w-full border-b border-gray-400 py-[0.8rem] text-gray-500">
        {children}
      </div>
    </div>
  );
}
