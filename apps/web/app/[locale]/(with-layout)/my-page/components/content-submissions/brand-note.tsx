import React from 'react';

import { useTranslations } from 'next-intl';

interface BrandNoteProps {
  text: string;
}

export default function BrandNote({ text }: BrandNoteProps) {
  const t = useTranslations('myPage.contentSubmissions.brandNote');
  const desc = t('description').split('\n');
  return (
    <div className="flex w-[84rem] flex-col items-start gap-[1.6rem] border border-gray-400 bg-white p-[4.8rem]">
      <div className="flex w-full flex-col items-start gap-[0.4rem]">
        <p className="title2 font-bold text-gray-800">{t('firstReview')}</p>
        <p className="body4 text-gray-500">
          {desc.map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>

      <p className="body3 w-full border-b-[1px] border-gray-400 p-[0.8rem] text-gray-900">
        {text}
      </p>
    </div>
  );
}
