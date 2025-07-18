'use client';

import { useQueryClient } from '@tanstack/react-query';
import ReviewOnboardingModal from 'app/review-modal/components/ReviewOnboardingModal';
import LoadingSvg from 'components/loading/loading-svg';
import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import type {
  ApiResponseImageReviewDetailResponse,
  ImageReviewDetailResponse,
} from '../../../../../api/data-contracts';
import { ApiResponse } from '../../../../../app/api/api-response';
import { ApiReviewSearchResponse } from '../../../../../app/api/review-response';
import { REVIEW_KEYS } from '../../../../../constants/query-key';
import {
  CategoryNameEng,
  CategoryOptionEng,
} from '../../../../../types/category';
import {
  isValidCategoryKey,
  isValidCategoryOption,
} from '../../../../../utils/category';
import ReviewModalSwiper from '../../../components/review-modal-swiper';
import { useAllImageReviewDetails } from '../../../hooks/review-api';
import type { ReviewDetail } from '../../../types';

const formatDateToJapanese = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};

interface ImageReviewClientPageProps {
  userStatus: boolean;
}

export default function ClientPage({ userStatus }: ImageReviewClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const middleCategory = searchParams.get('middleCategory');
  const subCategory = searchParams.get('subCategory');
  const queryClient = useQueryClient();

  // 카테고리 파라미터 검증
  const validMiddleCategory: CategoryNameEng | '' = isValidCategoryKey(
    middleCategory || ''
  )
    ? (middleCategory as CategoryNameEng)
    : '';
  const validSubCategory: CategoryOptionEng | '' =
    validMiddleCategory &&
    isValidCategoryOption(subCategory || '', validMiddleCategory)
      ? (subCategory as CategoryOptionEng)
      : '';

  // 캐싱된 데이터 가져오기
  let reviewData: any[] = [];

  if (keyword) {
    // 키워드 검색 캐시에서 데이터 가져오기
    const searchCacheData = queryClient.getQueryData<
      ApiResponse<ApiReviewSearchResponse>
    >([...REVIEW_KEYS.IMAGE_LIST({ page: 0, size: 8 }), 'search', keyword]);
    reviewData = searchCacheData?.data?.reviews || [];
  } else if (validMiddleCategory) {
    // 카테고리 검색 캐시에서 데이터 가져오기
    const categoryCacheData = queryClient.getQueryData<
      ApiResponse<ApiReviewSearchResponse>
    >([
      ...REVIEW_KEYS.IMAGE_LIST({ page: 0, size: 8 }),
      'category',
      validMiddleCategory,
      validSubCategory,
      'IMAGE',
    ]);
    reviewData = categoryCacheData?.data?.reviews || [];
  }

  console.log('keyword', keyword);
  console.log('middleCategory', middleCategory);
  console.log('subCategory', subCategory);
  console.log('reviewData', reviewData);

  const { reviewId: reviewIdParam } = useParams() as { reviewId: string };
  const currentReviewId = Number(reviewIdParam);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  // 모든 리뷰의 상세 정보 가져오기
  const detailQueries = useAllImageReviewDetails(reviewData);

  // 모든 상세 정보가 로딩 완료될 때까지 대기
  if (detailQueries.some((q) => q.isLoading)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black">
        <LoadingSvg />
      </div>
    );
  }

  // 상세 정보를 ID로 매핑
  const detailMap = new Map<number, ImageReviewDetailResponse>();
  reviewData.forEach((review, index) => {
    const dq = detailQueries[index];
    if (dq?.isSuccess && dq.data) {
      const response = dq.data as ApiResponseImageReviewDetailResponse;
      if (response.data) {
        detailMap.set(review.reviewId, response.data);
      }
    }
  });

  // 현재 리뷰의 인덱스 찾기
  const currentIndex = reviewData.findIndex(
    (review) => review.reviewId === currentReviewId
  );

  if (currentIndex === -1) {
    return <div>리뷰를 찾을 수 없습니다.</div>;
  }

  // 슬라이더에 넘길 리뷰 데이터 구성
  const allReviews: ReviewDetail[] = reviewData
    // 1) detail이 존재하고 images가 한 개 이상인 리뷰만 걸러내고
    .filter((review) => {
      const detail = detailMap.get(review.reviewId);
      return !!detail && detail.images.length > 0;
    })
    // 2) 걸러진 리뷰들에 대해서만 ReviewDetail 객체 생성
    .map((review) => {
      const detail = detailMap.get(review.reviewId)!;
      return {
        reviewId: detail.reviewId,
        productId: detail.productId,
        writtenTime: formatDateToJapanese(detail.writtenTime),
        receiptUploaded: detail.receiptUploaded,
        positiveComment: detail.positiveComment,
        negativeComment: detail.negativeComment,
        authorName: detail.authorName,
        profileImageUrl: detail.profileImageUrl ?? null,
        rating: detail.rating,
        option: detail.option || '',
        likeCount: detail.likeCount,
        isLiked: detail.isLiked,
        brandName: detail.brandName,
        productName: detail.productName,
        productImageUrl: detail.productImageUrl,
        mediaList: detail.images.map((url, index) => ({
          id: index,
          type: 'image' as const,
          url,
        })),
      };
    });

  return (
    <>
      {isOnboardingOpen && (
        <ReviewOnboardingModal handleCloseOnboarding={handleCloseOnboarding} />
      )}
      <ReviewModalSwiper
        userStatus={userStatus}
        currentIndex={currentIndex}
        reviews={allReviews}
        onClose={() => router.back()}
      />
    </>
  );
}
