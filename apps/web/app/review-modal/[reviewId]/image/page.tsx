'use client';

import { useParams, useRouter } from 'next/navigation';
import ReviewModalSwiper from '../../components/review-modal-swiper';
import {
  useImageReviews,
  useImageReviewDetail,
} from '../../hooks/image-review-api';
import type { ReviewDetail } from '../../types';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const reviewId = Number(params.reviewId);

  console.log('현재 reviewId:', reviewId);

  // 전체 이미지 리뷰 목록 가져오기
  const {
    data: reviewsListResponse,
    isLoading: isListLoading,
    error: listError,
  } = useImageReviews();

  // 클릭한 리뷰의 상세 정보 가져오기
  const {
    data: detailResponse,
    isLoading: isDetailLoading,
    error: detailError,
  } = useImageReviewDetail(reviewId);

  console.log('API 호출 상태:', {
    isListLoading,
    isDetailLoading,
    listError,
    detailError,
    reviewsListResponse,
    detailResponse,
  });

  if (isListLoading || isDetailLoading) {
    return <div>로딩 중...</div>;
  }

  if (listError || !reviewsListResponse?.data) {
    console.error('리뷰 목록 에러:', listError);
    console.error('리뷰 목록 응답:', reviewsListResponse);
    return <div>리뷰 목록을 불러올 수 없습니다.</div>;
  }

  if (detailError || !detailResponse?.data) {
    console.error('리뷰 상세 에러:', detailError);
    console.error('리뷰 상세 응답:', detailResponse);
    return <div>리뷰 상세 정보를 불러올 수 없습니다.</div>;
  }

  console.log('API 응답 데이터:', {
    reviewsList: reviewsListResponse.data,
    detailData: detailResponse.data,
  });

  // API 응답 구조 자세히 확인
  console.log('=== API 응답 구조 분석 ===');
  console.log('reviewsListResponse 전체:', reviewsListResponse);
  console.log('detailResponse 전체:', detailResponse);
  console.log('reviewsListResponse.data:', reviewsListResponse.data);
  console.log('detailResponse.data:', detailResponse.data);
  console.log(
    'reviewsListResponse.data.imageReviews:',
    reviewsListResponse.data?.imageReviews
  );
  console.log('detailResponse.data.images:', detailResponse.data?.images);

  // 실제로 존재하는 reviewId들 확인
  if (reviewsListResponse.data?.imageReviews) {
    console.log(
      '존재하는 reviewId들:',
      reviewsListResponse.data.imageReviews.map((r) => r.reviewId)
    );
  }

  // 리뷰 목록이 비어있는 경우 상세 데이터만으로 처리
  if (
    !reviewsListResponse.data.imageReviews ||
    reviewsListResponse.data.imageReviews.length === 0
  ) {
    console.log('리뷰 목록이 비어있으므로 상세 데이터만 사용');

    if (detailResponse.data) {
      const detailData = detailResponse.data;
      const singleReview: ReviewDetail = {
        reviewId: detailData.reviewId,
        writtenTime: detailData.writtenTime,
        receiptUploaded: detailData.receiptUploaded,
        positiveComment: detailData.positiveComment,
        negativeComment: detailData.negativeComment,
        authorName: detailData.authorName,
        profileImageUrl: detailData.profileImageUrl || null,
        rating:
          detailData.rating === 'FIVE'
            ? 5
            : detailData.rating === 'FOUR'
              ? 4
              : detailData.rating === 'THREE'
                ? 3
                : detailData.rating === 'TWO'
                  ? 2
                  : (1 as 1 | 2 | 3 | 4 | 5),
        option: detailData.option,
        likeCount: detailData.likeCount,
        brandName: detailData.brandName,
        productName: detailData.productName,
        productImageUrl: detailData.productImageUrl,
        mediaList: detailData.images.map((url, index) => ({
          id: index,
          type: 'image' as const,
          url,
        })),
      };

      console.log('단일 리뷰 데이터:', singleReview);
      return (
        <ReviewModalSwiper
          reviews={[singleReview]}
          onClose={() => router.back()}
        />
      );
    }
  }

  // 전체 리뷰 목록을 ReviewDetail 형태로 변환
  const allReviews: ReviewDetail[] = reviewsListResponse.data.imageReviews.map(
    (review) => ({
      reviewId: review.reviewId,
      writtenTime: new Date().toISOString(),
      receiptUploaded: false,
      positiveComment: '',
      negativeComment: '',
      authorName: '',
      profileImageUrl: null,
      rating: 5 as 1 | 2 | 3 | 4 | 5,
      option: '',
      likeCount: review.likeCount,
      brandName: review.brandName,
      productName: review.productName,
      productImageUrl: review.reviewImage,
      mediaList: [
        {
          id: 0,
          type: 'image' as const,
          url: review.reviewImage,
        },
      ],
    })
  );

  // 클릭한 리뷰의 상세 정보로 업데이트
  const currentReviewIndex = allReviews.findIndex(
    (review) => review.reviewId === reviewId
  );

  if (currentReviewIndex !== -1) {
    const detailData = detailResponse.data;
    allReviews[currentReviewIndex] = {
      reviewId: detailData.reviewId,
      writtenTime: detailData.writtenTime,
      receiptUploaded: detailData.receiptUploaded,
      positiveComment: detailData.positiveComment,
      negativeComment: detailData.negativeComment,
      authorName: detailData.authorName,
      profileImageUrl: detailData.profileImageUrl || null,
      rating: Number(detailData.rating) as 1 | 2 | 3 | 4 | 5,
      option: detailData.option,
      likeCount: detailData.likeCount,
      brandName: detailData.brandName,
      productName: detailData.productName,
      productImageUrl: detailData.productImageUrl,
      mediaList: detailData.images.map((url, index) => ({
        id: index,
        type: 'image' as const,
        url,
      })),
    };
  }

  return (
    <ReviewModalSwiper reviews={allReviews} onClose={() => router.back()} />
  );
}
