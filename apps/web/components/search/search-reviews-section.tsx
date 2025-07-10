'use client';

import CardReview from 'components/card/card-review';
import { ReviewItem } from 'types/review';
import MoreButton from './more-button';

interface RenderReviewsProps {
  reviewsVideo: ReviewItem[];
  reviewsImage: ReviewItem[];
  handleVideoButton: () => void;
  handleImageButton: () => void;
}

export default function RenderReviews({
  reviewsVideo,
  reviewsImage,
  handleVideoButton,
  handleImageButton,
}: RenderReviewsProps) {
  const handleCardClick = (reviewId: number) => {
    console.log(reviewId);
  };

  return (
    <section className="flex flex-col content-center self-stretch px-[11.9rem] pb-[12rem] pt-0">
      <div className="mx-auto flex w-[112.8rem] flex-col items-start gap-[3.2rem] self-stretch pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">動画レビュー</p>
        <div className="flex flex-wrap content-center items-center gap-[2.4rem] self-stretch">
          {reviewsVideo.map(
            ({ brandName, productName, reviewId, likeCount, imageUrl }) => (
              <CardReview
                key={reviewId}
                type="video"
                brandName={brandName}
                productName={productName}
                reviewId={reviewId}
                likeCount={likeCount}
                imageUrl={imageUrl}
                handleCardClick={handleCardClick}
              />
            )
          )}
        </div>
        <MoreButton onClick={handleVideoButton} />
      </div>

      <div className="mx-auto flex w-[112.8rem] flex-col gap-[3.2rem] self-stretch pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700"> 写真付きレビュー</p>
        <div className="flex flex-wrap content-center items-center gap-[2.4rem] self-stretch">
          {reviewsImage.map(
            ({ brandName, productName, reviewId, likeCount, imageUrl }) => (
              <CardReview
                key={reviewId}
                type="image"
                brandName={brandName}
                productName={productName}
                reviewId={reviewId}
                likeCount={likeCount}
                imageUrl={imageUrl}
                handleCardClick={handleCardClick}
              />
            )
          )}
        </div>
        <MoreButton onClick={handleImageButton} />
      </div>
    </section>
  );
}
