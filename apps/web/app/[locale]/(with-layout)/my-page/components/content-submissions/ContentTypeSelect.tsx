import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { SvgInstagram } from '@lococo/icons';
import { SvgTiktok } from '@lococo/icons';
import { cn } from '@lococo/utils';

import { ContentSubmissionsFormData } from '../../hooks/useContentSubmissions';

interface ContentTypeSelectProps {
  formData: ContentSubmissionsFormData;
  errors: { contentType: string | undefined };
  updateContentType: (contentType: string) => void;
}

export default function ContentTypeSelect({
  formData,
  errors,
  updateContentType,
}: ContentTypeSelectProps) {
  const t = useTranslations('myPage.contentSubmissions.contentTypeSelect');
  const [selectedContentType, setSelectedContentType] = useState<string>(
    formData.contentType
  );
  const handleContentTypeChange = (contentType: string) => {
    updateContentType(contentType);
    setSelectedContentType(contentType);
  };

  const CONTENT_TYPES = [
    {
      label: t('instagramPost'),
      icon: <SvgInstagram size={20} />,
    },
    {
      label: t('instagramReels'),
      icon: <SvgInstagram size={20} />,
    },
    {
      label: t('tiktokVideo'),
      icon: <SvgTiktok size={20} />,
    },
  ] as const;

  const getButtonClassName = (label: string) =>
    cn(
      'inter-body1 flex cursor-pointer items-center gap-[0.5rem] rounded-[2.4rem] border border-gray-400 px-[1.6rem] py-[0.6rem] transition-colors',
      selectedContentType === label &&
        'border-pink-500 bg-pink-100 text-pink-500'
    );

  return (
    <section className="flex w-full flex-col gap-[1.6rem]">
      <p className="inter-title2 text-gray-800">{t('title')}</p>
      <div className="flex gap-[1.2rem]">
        {CONTENT_TYPES.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleContentTypeChange(label)}
            className={getButtonClassName(label)}
          >
            {Icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
      {errors.contentType && <ErrorNotice message={errors.contentType} />}
    </section>
  );
}
