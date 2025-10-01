'use client';

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Input } from '@lococo/design-system/input';

interface BrandNoteProps {
  deadline: string;
}
export default function BrandNote({ deadline }: BrandNoteProps) {
  const t = useTranslations('brandFeedback.brandNote');
  const [brandNote, setBrandNote] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandNote(e.target.value);
  };
  return (
    <div className="flex w-[84rem] flex-col items-start gap-[1.6rem] border border-gray-400 bg-white px-[9.6rem] py-[4.8rem]">
      <div className="flex flex-col items-start">
        <p className="title2 mr-[0.8rem] font-bold text-gray-800">
          {t('title')}
        </p>
        <p className="body4 text-gray-500">{t('description')}</p>
        <p className="body4 text-red text-right">
          {t('notice')}: {deadline}
        </p>
      </div>
      <Input value={brandNote} onChange={handleChange} className="w-full" />
    </div>
  );
}
