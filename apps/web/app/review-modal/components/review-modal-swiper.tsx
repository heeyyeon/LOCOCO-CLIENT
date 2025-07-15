'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { ReviewDetail } from '../types';
import ReviewModalLayout from './review-modal-layout';

interface ReviewModalSwiperProps {
  reviews: ReviewDetail[];
  onClose: () => void;
}

export default function ReviewModalSwiper({
  reviews,
  onClose,
}: ReviewModalSwiperProps) {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1.2}
      centeredSlides
      spaceBetween={-45}
      className="inset-0 h-screen w-screen bg-black/70"
    >
      {reviews.map((review) => (
        <SwiperSlide
          key={review.reviewId}
          className="flex h-[55.2rem] items-center justify-center"
        >
          <ReviewModalLayout
            id={review.reviewId}
            mediaList={review.mediaList}
            user={{
              name: review.authorName,
              avatarUrl: review.profileImageUrl,
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
            onClose={onClose}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
