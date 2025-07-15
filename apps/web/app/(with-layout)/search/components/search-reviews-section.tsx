'use client';

import CardReview from 'components/card/card-review';
import { ReviewItem } from 'types/review';
import MoreButton from './more-button';

interface SearchReviewSectionProps {
  reviewsVideo: ReviewItem[];
  reviewsImage: ReviewItem[];
  handleVideoButton: () => void;
  handleImageButton: () => void;
}

export default function SearchReviewSection({
  reviewsVideo,
  reviewsImage,
  handleVideoButton,
  handleImageButton,
}: SearchReviewSectionProps) {
  const handleCardClick = (reviewId: number) => {
    console.log(reviewId);
  };
  return (
    <section className="mx-auto flex w-full flex-col content-center px-[11.9rem] pb-[12rem] pt-0">
      <div className="mx-auto flex w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">動画レビュー</p>
        <div className="grid grid-cols-4 gap-[2.4rem]">
          {reviewsVideo.map((review) => (
            <CardReview
              key={review.reviewId}
              type="video"
              brandName={review.brandName}
              productName={review.productName}
              reviewId={review.reviewId}
              likeCount={review.likeCount}
              imageUrl={review.imageUrl}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
        <MoreButton onClick={handleVideoButton} />
      </div>

      <div className="mx-auto flex w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700"> 写真付きレビュー</p>
        <div className="grid grid-cols-4 gap-[2.4rem]">
          {reviewsImage.map((review) => (
            <CardReview
              key={review.reviewId}
              type="image"
              brandName={review.brandName}
              productName={review.productName}
              reviewId={review.reviewId}
              likeCount={review.likeCount}
              imageUrl={review.imageUrl}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
        <MoreButton onClick={handleImageButton} />
      </div>
    </section>
  );
}
