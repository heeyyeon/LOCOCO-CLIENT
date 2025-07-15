'use client';

import { useParams, useRouter } from 'next/navigation';
import ReviewModalSwiper from '../../components/review-modal-swiper';
import { useImageReviewDetail } from '../../hooks/image-review-api';
import type { ReviewDetail } from '../../types';

const formatDateToJapanese = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}年${month}月${day}日`;
};

const convertRating = (rating: string): number => {
  switch (rating) {
    case 'FIVE':
      return 5;
    case 'FOUR':
      return 4;
    case 'THREE':
      return 3;
    case 'TWO':
      return 2;
    case 'ONE':
      return 1;
    default:
      return Number(rating) || 5;
  }
};

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const reviewId = Number(params.reviewId);

  // 클릭한 리뷰의 상세 정보 가져오기
  const {
    data: detailResponse,
    isLoading: isDetailLoading,
    error: detailError,
  } = useImageReviewDetail(reviewId);

  if (isDetailLoading) {
    return <div>로딩 중...</div>;
  }

  if (detailError || !detailResponse?.data) {
    console.error('리뷰 상세 에러:', detailError);
    console.error('리뷰 상세 응답:', detailResponse);
    return <div>리뷰 상세 정보를 불러올 수 없습니다.</div>;
  }

  const detailData = detailResponse.data;
  const review: ReviewDetail = {
    reviewId: detailData.reviewId,
    writtenTime: formatDateToJapanese(detailData.writtenTime),
    receiptUploaded: detailData.receiptUploaded,
    positiveComment: detailData.positiveComment,
    negativeComment: detailData.negativeComment,
    authorName: detailData.authorName,
    profileImageUrl: detailData.profileImageUrl || null,
    rating: convertRating(detailData.rating),
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

  return <ReviewModalSwiper reviews={[review]} onClose={() => router.back()} />;
}
