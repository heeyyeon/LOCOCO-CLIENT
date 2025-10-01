'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@lococo/design-system/button';
import { Select } from '@lococo/design-system/select';

import ContentType from '../../my-page/final-review/components/content-type';
import FinalWrapper from '../../my-page/final-review/components/final-wrapper';
import ImageBox from '../../my-page/final-review/components/image-box';
import BrandNote from './components/brand-note';
import CreatorInfo from './components/creator-info';
import { mockup, mockup2 } from './mockup';

export default function page() {
  const userInfo = mockup;
  const userInfo2 = mockup2;
  const t = useTranslations('brandFeedback');
  return (
    <div className="flex w-full flex-col items-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
      <CreatorInfo
        name={userInfo.name}
        image={userInfo.image}
        id={userInfo.id}
        date={userInfo.date}
      />
      <div className="flex w-[84rem] flex-col items-start gap-[4.8rem] border border-gray-400 bg-white px-[9.6rem] py-[4.8rem]">
        <FinalWrapper title={t('campaignName')}>
          <Select options={[]} />
        </FinalWrapper>
        <FinalWrapper title={t('contentType')}>
          <ContentType contentType={userInfo2.contentType} />
        </FinalWrapper>
        <FinalWrapper title={t('mediaUrls')}>
          <ImageBox images={userInfo2.mediaUrls as string[]} />
        </FinalWrapper>
        <FinalWrapper title={t('captionAndHashtags')}>
          <p className="body4 flex w-full border-b border-gray-400 py-[0.8rem] text-gray-800">
            {userInfo2.submitCaptionAndHashtags}
          </p>
        </FinalWrapper>
      </div>
      <BrandNote deadline={userInfo2.brandNoteDeadline} />
      <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
        <Button
          variant="outline"
          color="primary"
          size="lg"
          className="w-[41.2rem]"
          onClick={() => {}}
        >
          {t('formButton.save')}
        </Button>
        <Button
          variant="filled"
          color="primary"
          size="lg"
          className="w-[41.2rem]"
          onClick={() => {}}
        >
          {t('formButton.deliver')}
        </Button>
      </div>
    </div>
  );
}
