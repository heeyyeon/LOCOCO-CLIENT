'use client';

import CardReview from 'components/card/card-review';
import CardSkeletonWrapper from 'components/card/card-skeleton';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ImageReviewResponse,
  VideoReviewResponse,
} from '../../../api/review-response';
import useReviewSectionData from '../hook/use-review-section';
import NotFoundSection from './not-found-section';

function VideoReviewSection() {
  const { reviewData, isLoading, hasError } = useReviewSectionData('VIDEO');
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  const videoReviews: VideoReviewResponse[] = reviewData.map((review) => ({
    reviewId: review.reviewId,
    brandName: review.brandName,
    productName: review.productName,
    likeCount: review.likeCount,
    url: review.url || '',
  }));

  const handleCardClick = (reviewId: number) => {
    router.push(`/review-modal/${reviewId}/search/video?keyword=${keyword}`);
  };

  if (isLoading) {
    return (
      <div className="flex max-w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">動画レビュー</p>
        <CardSkeletonWrapper type="REVIEW_VIDEO" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex max-w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">動画レビュー</p>
        <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex max-w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
      <p className="jp-head3 font-bold text-gray-700">動画レビュー</p>
      {videoReviews.length === 0 ? (
        <NotFoundSection variant="review" />
      ) : (
        <div className="grid max-w-[1366px] grid-cols-4 gap-[2.4rem]">
          {videoReviews.map(
            ({ reviewId, brandName, productName, likeCount, url }) => (
              <CardReview
                key={reviewId}
                type="video"
                brandName={brandName}
                productName={productName}
                reviewId={reviewId}
                likeCount={likeCount}
                mediaUrl={url}
                handleCardClick={handleCardClick}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

function ImageReviewSection() {
  const { reviewData, isLoading, hasError } = useReviewSectionData('IMAGE');
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  const imageReviews: ImageReviewResponse[] = reviewData.map((review) => ({
    reviewId: review.reviewId,
    brandName: review.brandName,
    productName: review.productName,
    likeCount: review.likeCount,
    url: review.url || '',
  }));

  const handleCardClick = (reviewId: number) => {
    router.push(`/review-modal/${reviewId}/search/image?keyword=${keyword}`);
  };

  if (isLoading) {
    return (
      <div className="flex max-w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">写真付きレビュー</p>
        <CardSkeletonWrapper type="REVIEW_IMAGE" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex max-w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
        <p className="jp-head3 font-bold text-gray-700">写真付きレビュー</p>
        <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex max-w-[1366px] flex-col gap-[3.2rem] pt-[3.2rem]">
      <p className="jp-head3 font-bold text-gray-700">写真付きレビュー</p>
      {imageReviews.length === 0 ? (
        <NotFoundSection variant="review" />
      ) : (
        <div className="grid max-w-[1366px] grid-cols-4 gap-[2.4rem]">
          {imageReviews.map(
            ({ reviewId, brandName, productName, likeCount, url }) => (
              <CardReview
                key={reviewId}
                type="image"
                brandName={brandName}
                productName={productName}
                reviewId={reviewId}
                likeCount={likeCount}
                mediaUrl={url}
                handleCardClick={() => handleCardClick(reviewId)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchReviewSection() {
  return (
    <section className="mx-auto flex w-[1366px] flex-col content-center px-[11.9rem] pb-[12rem] pt-0">
      <VideoReviewSection />
      <ImageReviewSection />
    </section>
  );
}
