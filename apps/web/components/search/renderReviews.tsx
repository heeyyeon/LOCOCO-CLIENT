'use client';

import CardReview from 'components/card/card-review';
import { ReviewItem } from 'types/review';
import MoreButton from './moreButton';

export default function RenderReviews({
  reviewsVideo,
  reviewsImage,
}: {
  reviewsVideo: ReviewItem[];
  reviewsImage: ReviewItem[];
}) {
  const handleCardClick = (reviewId: number) => {};
  return (
    <section className="flex w-[136.6rem] flex-col items-start px-[11.9rem] pb-[12rem] pt-0">
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch pt-[3.2rem]">
        <p className="text-jp-head3 font-bold text-gray-700">動画レビュー</p>
        <div className="flex flex-wrap content-center items-center gap-[2.4rem] self-stretch">
          {reviewsVideo.map(
            ({
              ranking,
              brandName,
              productName,
              reviewId,
              likeCount,
              imageUrl,
            }) => (
              <CardReview
                key={reviewId}
                type="video"
                ranking={ranking}
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
        <MoreButton />
      </div>
      {
        //사진이 있는 리뷰
      }
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch pt-[4.8rem]">
        <p className="text-jp-head3 font-bold text-gray-700">
          写真付きレビュー
        </p>
        <div className="flex flex-col items-start gap-[3.2rem] self-stretch pt-[4.8rem]">
          {reviewsImage.map(
            ({
              ranking,
              brandName,
              productName,
              reviewId,
              likeCount,
              imageUrl,
            }) => (
              <CardReview
                key={reviewId}
                type="image"
                ranking={ranking}
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
        <MoreButton />
      </div>
    </section>
  );
}
