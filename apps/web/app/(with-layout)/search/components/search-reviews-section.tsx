'use client';

import CardReview from 'components/card/card-review';
import {
  ImageReviewResponse,
  VideoReviewResponse,
} from '../../../api/review-response';
import NotFoundSection from './not-found-section';

interface SearchReviewSectionProps {
  reviewsVideo: VideoReviewResponse[];
  reviewsImage: ImageReviewResponse[];
}

export default function SearchReviewSection({
  reviewsVideo,
  reviewsImage,
}: SearchReviewSectionProps) {
  const handleCardClick = (reviewId: number) => {
    console.log(reviewId);
  };

  return (
    <section className="mx-auto flex w-[1366px] flex-col content-center px-[11.9rem] pb-[12rem] pt-0">
      <div className="flex max-w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">動画レビュー</p>
        {reviewsVideo.length === 0 ? (
          <NotFoundSection variant="review" />
        ) : (
          <div className="grid max-w-[1366px] grid-cols-4 gap-[2.4rem]">
            {reviewsVideo.map(
              ({ reviewId, brandName, productName, likeCount, url }) => (
                <CardReview
                  key={reviewId}
                  type="video"
                  brandName={brandName}
                  productName={productName}
                  reviewId={reviewId}
                  likeCount={likeCount}
                  imageUrl={url}
                  handleCardClick={handleCardClick}
                />
              )
            )}
          </div>
        )}
      </div>

      <div className="flex max-w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">写真付きレビュー</p>
        {reviewsImage.length === 0 ? (
          <NotFoundSection variant="review" />
        ) : (
          <div className="grid max-w-[1366px] grid-cols-4 gap-[2.4rem]">
            {reviewsImage.map(
              ({ reviewId, brandName, productName, likeCount, url }) => (
                <CardReview
                  key={reviewId}
                  type="image"
                  brandName={brandName}
                  productName={productName}
                  reviewId={reviewId}
                  likeCount={likeCount}
                  imageUrl={url}
                  handleCardClick={handleCardClick}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
