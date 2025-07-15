'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import ReviewModalLayout from '../../components/review-modal-layout';
import { videoReviewMocks } from '../../mocks';

export default function Page() {
  const router = useRouter();

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1.2}
      centeredSlides
      spaceBetween={-45}
      className="inset-0 h-screen w-screen bg-black/70"
    >
      {videoReviewMocks.map((review) => (
        <SwiperSlide
          key={review.reviewId}
          className="flex h-[55.2rem] items-center justify-center"
        >
          <ReviewModalLayout
            id={review.reviewId}
            mediaList={review.mediaList}
            user={{
              name: review.authorName,
              avatarUrl: review.profileImageUrl || undefined,
              uploadAt: review.writtenTime,
            }}
            likeCount={review.likeCount}
            brandName={review.brandName}
            productName={review.productName}
            productOption={review.option}
            rating={review.rating}
            isReceipt={review.receiptUploaded}
            positiveComment={review.positiveComment}
            negativeComment={review.negativeComment}
            productImageUrl={review.productImageUrl}
            onClose={() => router.back()}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
