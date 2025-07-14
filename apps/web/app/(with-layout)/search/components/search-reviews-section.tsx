'use client';

import CardReview from 'components/card/card-review';
import {
  ImageReviewResponse,
  VideoReviewResponse,
} from '../../../api/review-respone';
import NotFoundReviewSection from './not-found-review-section';

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
    <section className="flex flex-col content-center self-stretch px-[11.9rem] pb-[12rem] pt-0">
      <div className="mx-auto flex w-[112.8rem] flex-col items-start gap-[3.2rem] self-stretch pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">動画レビュー</p>
        {reviewsVideo.length === 0 ? (
          <NotFoundReviewSection />
        ) : (
          <div className="flex flex-wrap content-center items-center gap-[2.4rem] self-stretch">
            {reviewsVideo.map(
              ({
                reviewId = 0,
                brandName = '',
                productName,
                likeCount,
                url = '',
              }) => (
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

      <div className="mx-auto flex w-[112.8rem] flex-col gap-[3.2rem] self-stretch pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">写真付きレビュー</p>
        {reviewsImage.length === 0 ? (
          <NotFoundReviewSection />
        ) : (
          <div className="flex flex-wrap content-center items-center gap-[2.4rem] self-stretch">
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
