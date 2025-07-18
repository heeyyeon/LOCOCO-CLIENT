'use client';

import SwiperCore from 'swiper';
import 'swiper/css';
import { Mousewheel, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import type { ReviewDetail } from '../types';
import ReviewModalLayout from './review-modal-layout';

interface ReviewModalSwiperProps {
  currentIndex: number;
  reviews: ReviewDetail[];
  onClose: () => void;
  userStatus: boolean;
}

export default function ReviewModalSwiper({
  currentIndex,
  reviews,
  onClose,
  userStatus,
}: ReviewModalSwiperProps) {
  const [swiper, setSwiper] = useState<SwiperCore>();

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(currentIndex);
    }
  }, [swiper, currentIndex]);

  return (
    <Swiper
      onSwiper={setSwiper}
      direction="vertical"
      slidesPerView={1.2}
      centeredSlides
      spaceBetween={-45}
      modules={[Mousewheel, FreeMode]}
      mousewheel={{
        sensitivity: 0.4,
        releaseOnEdges: true,
        forceToAxis: true,
        thresholdDelta: 50,
        thresholdTime: 200,
      }}
      freeMode={{
        enabled: true,
        sticky: true,
      }}
      speed={400}
      resistance={false}
      className="inset-0 h-screen w-screen bg-black/70"
    >
      {reviews.map((review) => (
        <SwiperSlide
          key={review.reviewId}
          className="flex h-[55.2rem] items-center justify-center"
        >
          <ReviewModalLayout
            userStatus={userStatus}
            id={review.reviewId}
            productId={review.productId}
            mediaList={review.mediaList}
            user={{
              name: review.authorName,
              avatarUrl: review.profileImageUrl,
              uploadAt: review.writtenTime,
            }}
            likeCount={review.likeCount}
            isLiked={review.isLiked}
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
