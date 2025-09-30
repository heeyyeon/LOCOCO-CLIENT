'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useReviewResult } from '../hooks/use-review-result';
import ContentType from './components/content-type';
import FinalWrapper from './components/final-wrapper';
import ImageBox from './components/image-box';

export default function FinalReview() {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId');
  const { data: reviewResult } = useReviewResult(Number(campaignId));

  const t = useTranslations('myPage.finalReview');

  return (
    <div className="flex min-h-[calc(100vh-11.2rem)] w-full flex-col items-center gap-[8.4rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
      {reviewResult?.data &&
        reviewResult.data?.reviewContents?.map((item, index) => (
          <div className="flex w-[84rem] flex-col items-start gap-[4.8rem] border border-gray-400 bg-white p-[4.8rem]">
            <p className="title2 font-bold text-gray-800">
              {index == 0 ? t('1stContent') : t('2ndContent')}:{' '}
              {reviewResult.data?.campaignName}
            </p>
            <FinalWrapper title={t('contentType.title')}>
              <ContentType contentType={item.contentType} />
            </FinalWrapper>
            <FinalWrapper title={t('socialMediaContents')}>
              <ImageBox images={item.mediaUrls || []} />
            </FinalWrapper>

            <FinalWrapper title={t('submitCaptionAndHashtags')}>
              <p className="body4 flex w-full border-b border-gray-400 py-[0.8rem] text-gray-800">
                {item.captionWithHashtags}
              </p>
            </FinalWrapper>
          </div>
        ))}
    </div>
  );
}
