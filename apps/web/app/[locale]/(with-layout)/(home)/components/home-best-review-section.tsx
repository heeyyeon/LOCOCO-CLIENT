'use client';

import { useTranslations } from 'next-intl';

import { useQueries } from '@tanstack/react-query';
import CardReview from 'components/card/card-review';
import CardSkeletonWrapper from 'components/card/card-skeleton';

import ReviewNotFoundSection from '../../search/components/review-not-found';
import { getImageReviews, getVideoReviews } from '../utils/get-review-items';

export default function HomeBestReviewSection() {
  const t = useTranslations('main');
  const [
    { data: videoReviewsData, isPending: isVideoReviewsPending },
    { data: imageReviewsData, isPending: isImageReviewsPending },
  ] = useQueries({
    queries: [getVideoReviews(), getImageReviews()],
  });

  const videoReviews = videoReviewsData?.data?.videoReviews ?? [];
  const imageReviews = imageReviewsData?.data?.imageReviews ?? [];

  return (
    <div className="flex flex-col items-start gap-[2.4rem]">
      <div className="flex flex-col items-start gap-[2.4rem]">
        <p className="title2 font-bold text-gray-700">{t('videoReviews')}</p>
        <div className="flex flex-wrap items-center gap-[2.4rem]">
          {isVideoReviewsPending ? (
            <CardSkeletonWrapper type="REVIEW_VIDEO" />
          ) : videoReviews.length > 0 ? (
            videoReviews.map((review) => (
              <CardReview
                key={review.reviewId}
                type="video"
                brandName={review.brandName}
                productName={review.productName}
                reviewId={review.reviewId}
                likeCount={review.likeCount}
                mediaUrl={review.reviewVideo}
                handleCardClick={() => {
                  // TODO
                  return null;
                }}
              />
            ))
          ) : (
            <ReviewNotFoundSection />
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-[2.4rem]">
        <p className="title2 font-bold text-gray-700">{t('imageReviews')}</p>
        <div className="flex w-full flex-wrap items-center gap-[2.4rem]">
          {isImageReviewsPending ? (
            <CardSkeletonWrapper type="REVIEW_IMAGE" />
          ) : imageReviews.length > 0 ? (
            imageReviews.map((review) => (
              <CardReview
                key={review.reviewId}
                type="image"
                brandName={review.brandName}
                productName={review.productName}
                reviewId={review.reviewId}
                likeCount={review.likeCount}
                mediaUrl={review.reviewImage}
                handleCardClick={() => {
                  // TODO
                  return null;
                }}
              />
            ))
          ) : (
            <ReviewNotFoundSection />
          )}
        </div>
      </div>
    </div>
  );
}
