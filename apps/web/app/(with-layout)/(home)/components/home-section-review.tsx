'use client';

import { ReviewImageResponse, ReviewVideoResponse } from 'api/data-contracts';
import CardReview from 'components/card/card-review';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import { SvgArrowOutward } from '@/icons';
import { cn } from '@/lib/utils';

interface HomeSectionReviewProps {
  type: 'video' | 'image';
  className?: string;
  reviewCardList: ReviewImageResponse | ReviewVideoResponse;
}

export default function HomeSectionReview({
  type,
  className,
  reviewCardList,
}: HomeSectionReviewProps) {
  const router = useRouter();
  const reviews =
    'imageReviews' in reviewCardList
      ? reviewCardList.imageReviews
      : reviewCardList.videoReviews;
  return (
    <div className={cn(`mt-8 flex flex-col gap-8`, className)}>
      <p className="jp-head3 font-[700]">
        {type === 'video' && '動画レビュー'}
        {type === 'image' && '写真付きレビュー'}
      </p>
      <div className="grid grid-cols-4 gap-[2.4rem]">
        {reviews.map((review, index) => (
          <CardReview
            key={review.reviewId}
            {...(index < 3 && { ranking: index + 1 })}
            type={type}
            brandName={review.brandName}
            productName={review.productName}
            reviewId={review.reviewId}
            likeCount={review.likeCount}
            imageUrl={
              type === 'image' ? review.reviewImage : review.reviewVideo
            }
            handleCardClick={() => router.push(`/review/${review.reviewId}`)}
          >
            <Button
              color="primary"
              variant="outline"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/product-detail/productId받아서줄것`);
              }}
            >
              <div className="jp-title3 flex items-center gap-[0.8rem] font-bold">
                <SvgArrowOutward />
                見に行く
              </div>
            </Button>
          </CardReview>
        ))}
      </div>
    </div>
  );
}
