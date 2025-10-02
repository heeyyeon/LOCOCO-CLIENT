'use client';

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import LoadingSvg from 'components/loading/loading-svg';

import { Button } from '@lococo/design-system/button';
import { Select } from '@lococo/design-system/select';

import ContentType from '../../my-page/final-review/components/content-type';
import FinalWrapper from '../../my-page/final-review/components/final-wrapper';
import ImageBox from '../../my-page/final-review/components/image-box';
import { DeliveryModal } from './@modal/(.)delivery-modal/DeliveryModal';
import { SaveFormModal } from './@modal/(.)save-form-modal/SaveFormModal';
import BrandNote from './components/brand-note';
import CreatorInfo from './components/creator-info';
import { useBrandNote, useGetReview } from './hooks/use-review';

export default function page() {
  const t = useTranslations('brandFeedback');
  const searchParams = useSearchParams();
  const campaignReviewId = searchParams.get('campaignReviewId');
  const { data: review, isLoading } = useGetReview(Number(campaignReviewId));
  const [brandNote, setBrandNote] = useState('');
  const [error, setError] = useState('');
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isSaveFormModalOpen, setIsSaveFormModalOpen] = useState(false);
  console.log(review);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandNote(e.target.value);
  };
  const { mutate: saveBrandNote } = useBrandNote(
    Number(campaignReviewId),
    brandNote
  );

  const handleDeliver = () => {
    if (!brandNote) {
      setError(t('brandNote.error'));
      return;
    }
    setError('');
    saveBrandNote('SUBMIT', {
      onSuccess: () => {
        setIsDeliveryModalOpen(true);
      },
    });
  };

  const handleSave = () => {
    if (!brandNote) {
      setError(t('brandNote.error'));
      return;
    }
    setError('');
    saveBrandNote('SAVE_DRAFT', {
      onSuccess: () => {
        setIsSaveFormModalOpen(true);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[50rem] w-full items-center justify-center">
        <LoadingSvg />
      </div>
    );
  }

  return (
    <>
      <DeliveryModal
        open={isDeliveryModalOpen}
        onOpenChange={setIsDeliveryModalOpen}
      />
      <SaveFormModal
        open={isSaveFormModalOpen}
        onOpenChange={setIsSaveFormModalOpen}
      />
      <div className="flex w-full flex-col items-center gap-[3.2rem] bg-gray-100 px-[9.4rem] py-[6.4rem]">
        <CreatorInfo
          name={review?.data?.creator.creatorFullName ?? ''}
          image={review?.data?.creator.profileImageUrl ?? ''}
          creatorNickname={review?.data?.creator.creatorNickname ?? ''}
          date={review?.data?.reviewRequestedAt ?? ''}
        />
        <div className="flex w-[84rem] flex-col items-start gap-[4.8rem] border border-gray-400 bg-white px-[9.6rem] py-[4.8rem]">
          <FinalWrapper title={t('campaignName')}>
            <Select
              options={[
                {
                  label: review?.data?.title ?? '',
                },
              ]}
              value={review?.data?.title ?? ''}
            />
          </FinalWrapper>
          <FinalWrapper title={t('contentType')}>
            <ContentType contentType={review?.data?.contentType} />
          </FinalWrapper>
          <FinalWrapper title={t('mediaUrls')}>
            <ImageBox images={review?.data?.reviewImages ?? []} />
          </FinalWrapper>
          <FinalWrapper title={t('captionAndHashtags')}>
            <p className="body4 flex w-full border-b border-gray-400 py-[0.8rem] text-gray-800">
              s{review?.data?.captionWithHashtags}
            </p>
          </FinalWrapper>
        </div>
        <BrandNote
          handleChange={handleChange}
          deadline={review?.data?.brandNoteDeadline ?? ''}
          brandNote={brandNote}
          error={error}
        />
        <div className="flex w-[84rem] items-center justify-between gap-[1.6rem]">
          <Button
            variant="outline"
            color="primary"
            size="lg"
            className="w-[41.2rem]"
            onClick={handleSave}
          >
            {t('formButton.save')}
          </Button>
          <Button
            variant="filled"
            color="primary"
            size="lg"
            className="w-[41.2rem]"
            onClick={handleDeliver}
          >
            {t('formButton.deliver')}
          </Button>
        </div>
      </div>
    </>
  );
}
