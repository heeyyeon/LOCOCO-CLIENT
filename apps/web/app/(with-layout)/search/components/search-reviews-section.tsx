'use client';

import CardReview from 'components/card/card-review';
import CardSkeletonWrapper from 'components/card/card-skeleton';
import { useReviewSearch, useCategoryReviewSearch } from 'hooks/headers-api';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';
import { useSearchParams } from 'next/navigation';
import {
  ImageReviewResponse,
  VideoReviewResponse,
} from '../../../api/review-response';
import NotFoundSection from './not-found-section';

function VideoReviewSection() {
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const rawMiddle = searchParams.get('middleCategory') || '';
  const rawSub = searchParams.get('subCategory') || '';

  const middleCategory: CategoryNameEng | '' = isValidCategoryKey(rawMiddle)
    ? rawMiddle
    : '';
  const subCategory: CategoryOptionEng | '' =
    middleCategory && isValidCategoryOption(rawSub, middleCategory)
      ? rawSub
      : '';

  const PAGE_SIZE = 8;
  const PAGE_NUMBER = 0;

  const {
    data: reviewVideoSearchData,
    isLoading: isReviewVideoSearchLoading,
    isError: isReviewVideoSearchError,
  } = useReviewSearch(keyword, 'VIDEO', PAGE_NUMBER, PAGE_SIZE, !!keyword);

  const {
    data: categoryReviewVideoData,
    isLoading: isCategoryReviewVideoLoading,
    isError: isCategoryReviewVideoError,
  } = useCategoryReviewSearch(
    middleCategory,
    'VIDEO',
    subCategory,
    PAGE_NUMBER,
    PAGE_SIZE,
    !!middleCategory
  );

  const reviewVideoData = keyword
    ? reviewVideoSearchData?.data?.reviews || []
    : categoryReviewVideoData?.data?.reviews || [];

  const videoReviews: VideoReviewResponse[] = reviewVideoData.map((review) => ({
    reviewId: review.reviewId,
    brandName: review.brandName,
    productName: review.productName,
    likeCount: review.likeCount,
    url: review.url || '',
  }));

  const isLoading = keyword
    ? isReviewVideoSearchLoading
    : isCategoryReviewVideoLoading;
  const hasError = keyword
    ? isReviewVideoSearchError
    : isCategoryReviewVideoError;

  const handleCardClick = (reviewId: number) => {
    console.log(reviewId);
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
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const rawMiddle = searchParams.get('middleCategory') || '';
  const rawSub = searchParams.get('subCategory') || '';

  const middleCategory: CategoryNameEng | '' = isValidCategoryKey(rawMiddle)
    ? rawMiddle
    : '';
  const subCategory: CategoryOptionEng | '' =
    middleCategory && isValidCategoryOption(rawSub, middleCategory)
      ? rawSub
      : '';

  const PAGE_SIZE = 8;
  const PAGE_NUMBER = 0;

  const {
    data: reviewImageSearchData,
    isLoading: isReviewImageSearchLoading,
    isError: isReviewImageSearchError,
  } = useReviewSearch(keyword, 'IMAGE', PAGE_NUMBER, PAGE_SIZE, !!keyword);

  const {
    data: categoryReviewImageData,
    isLoading: isCategoryReviewImageLoading,
    isError: isCategoryReviewImageError,
  } = useCategoryReviewSearch(
    middleCategory,
    'IMAGE',
    subCategory,
    PAGE_NUMBER,
    PAGE_SIZE,
    !!middleCategory
  );

  const reviewImageData = keyword
    ? reviewImageSearchData?.data?.reviews || []
    : categoryReviewImageData?.data?.reviews || [];

  const imageReviews: ImageReviewResponse[] = reviewImageData.map((review) => ({
    reviewId: review.reviewId,
    brandName: review.brandName,
    productName: review.productName,
    likeCount: review.likeCount,
    url: review.url || '',
  }));

  const isLoading = keyword
    ? isReviewImageSearchLoading
    : isCategoryReviewImageLoading;
  const hasError = keyword
    ? isReviewImageSearchError
    : isCategoryReviewImageError;

  const handleCardClick = (reviewId: number) => {
    console.log(reviewId);
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
                handleCardClick={handleCardClick}
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
