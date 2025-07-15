'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import ReviewModalLayout from '../../components/review-modal-layout';
import { imageReviewMocks } from '../../mocks';

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
      {imageReviewMocks.map((review, idx) => (
        <SwiperSlide
          key={idx}
          className="flex h-[55.2rem] items-center justify-center"
        >
          <ReviewModalLayout
            id={idx}
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
