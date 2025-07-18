'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from 'app/api/api-response';
import { ApiReviewSearchResponse } from 'app/api/review-response';
import ReviewOnboardingModal from 'app/review-modal/components/ReviewOnboardingModal';
import LoadingSvg from 'components/loading/loading-svg';
import { REVIEW_KEYS } from 'constants/query-key';
import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import type {
  ApiResponseVideoReviewDetailResponse,
  VideoReviewDetailResponse,
} from '../../../../../api/data-contracts';
import ReviewModalSwiper from '../../../components/review-modal-swiper';
import { useAllVideoReviewDetails } from '../../../hooks/review-api';
import type { ReviewDetail } from '../../../types';

const formatDateToJapanese = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};

interface VideoReviewClientPageProps {
  userStatus: boolean;
}

export default function ClientPage({ userStatus }: VideoReviewClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const queryClient = useQueryClient();
  const reviewData = queryClient.getQueryData<
    ApiResponse<ApiReviewSearchResponse>
  >([...REVIEW_KEYS.VIDEO_LIST({ page: 0, size: 8 }), 'search', keyword]);
  console.log('reviewData', reviewData);
  console.log('keyword', keyword);

  const { reviewId: reviewIdParam } = useParams() as { reviewId: string };
  const currentReviewId = Number(reviewIdParam);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  // 모든 리뷰의 상세 정보 가져오기
  const detailQueries = useAllVideoReviewDetails(reviewData?.data?.reviews);

  // 모든 상세 정보가 로딩 완료될 때까지 대기
  if (detailQueries.some((q) => q.isLoading)) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black">
        <LoadingSvg />
      </div>
    );
  }

  // 상세 정보를 ID로 매핑
  const detailMap = new Map<number, VideoReviewDetailResponse>();
  reviewData?.data?.reviews?.forEach((review, index) => {
    const dq = detailQueries[index];
    if (dq?.isSuccess && dq.data) {
      const response = dq.data as ApiResponseVideoReviewDetailResponse;
      if (response.data) {
        detailMap.set(review.reviewId, response.data);
      }
    }
  });

  // 현재 리뷰의 인덱스 찾기
  const currentIndex =
    reviewData?.data?.reviews?.findIndex(
      (review) => review.reviewId === currentReviewId
    ) ?? -1;

  if (currentIndex === -1) {
    return <div>리뷰를 찾을 수 없습니다.</div>;
  }

  // 슬라이더에 넘길 리뷰 데이터 구성
  const allReviews: ReviewDetail[] =
    reviewData?.data?.reviews?.map((review) => {
      const detail = detailMap.get(review.reviewId);

      if (!detail) {
        throw new Error(
          `리뷰 ${review.reviewId}의 상세 정보를 찾을 수 없습니다.`
        );
      }

      return {
        reviewId: detail.reviewId,
        productId: detail.productId,
        writtenTime: formatDateToJapanese(detail.uploadAt),
        receiptUploaded: !!detail.receiptImageUrl,
        positiveComment: detail.positiveContent,
        negativeComment: detail.negativeContent,
        authorName: detail.authorName,
        profileImageUrl: detail.profileImageUrl ?? null,
        rating: detail.rating,
        option: '',
        likeCount: detail.likeCount,
        isLiked: detail.isLiked,
        brandName: detail.brandName,
        productName: detail.productName,
        productImageUrl: detail.productImageUrl,
        mediaList: detail.videoUrls.map((url: string, index: number) => ({
          id: index,
          type: 'video' as const,
          url,
        })),
      };
    }) || [];

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
