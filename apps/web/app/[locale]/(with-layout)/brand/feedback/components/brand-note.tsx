'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import dayjs from 'dayjs';

import { ErrorNotice } from '@lococo/design-system/error-notice';
import { Input } from '@lococo/design-system/input';

interface BrandNoteProps {
  brandNote: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deadline: string;
  error?: string;
}
export default function BrandNote({
  deadline,
  brandNote,
  handleChange,
  error,
}: BrandNoteProps) {
  const t = useTranslations('brandFeedback.brandNote');
  const day = dayjs(deadline);

  return (
    <div className="flex w-[84rem] flex-col items-start gap-[1.6rem] border border-gray-400 bg-white px-[9.6rem] py-[4.8rem]">
      <div className="flex flex-col items-start">
        <p className="title2 mr-[0.8rem] font-bold text-gray-800">
          {t('title')}
        </p>
        <p className="body4 text-gray-500">{t('description')}</p>
        <p className="body4 text-red text-right">
          {t('notice')}: {day.format('YYYY.MM.DD')}
        </p>
      </div>
      <Input value={brandNote} onChange={handleChange} className="w-full" />
      {error && <ErrorNotice message={error} />}
    </div>
  );
}
