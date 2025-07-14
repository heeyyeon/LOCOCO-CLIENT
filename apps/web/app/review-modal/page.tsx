'use client';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import ReviewModalLayout from './components/review-modal-layout';

// TODO 목 데이터 이후 삭제 예정
const mediaList = [
  {
    mediaList: [
      {
        type: 'video' as const,
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      },
    ],
    user: { name: '김정은', avatarUrl: '' },
    date: '2025年07月01日',
    likeCount: 123,
    brandName: 'ラネージュ',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    productName: 'リップスリーピングマスクプスリーピングマスク',
    productOption: '001グレーブラウン',
    rating: 3,
    isReceipt: true,
    positiveComment:
      '最近使い始めたこの化粧水と乳液のセット、本当に気に入っています。',
    negativeComment:
      '乳液もべたつかず、肌にすっとなじんでくれるのが嬉しいポイントです。朝のスキンケアのあとすぐにメイクをしても、ヨレたりテカったりしないのでとても使いやすいです。',
    authorName: '김정은',
    uploadAt: '2025-07-01T12:34:56Z',
  },
  {
    mediaList: [
      {
        type: 'video' as const,
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      },
    ],
    user: { name: '김정은', avatarUrl: '' },
    date: '2025年07月01日',
    likeCount: 123,
    brandName: 'ラネージュ',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    productName: 'リップスリーピングマスクプスリーピングマスク',
    productOption: '001グレーブラウン',
    rating: 3,
    isReceipt: true,
    positiveComment:
      '最近使い始めたこの化粧水と乳液のセット、本当に気に入っています。',
    negativeComment:
      '乳液もべたつかず、肌にすっとなじんでくれるのが嬉しいポイントです。朝のスキンケアのあとすぐにメイクをしても、ヨレたりテカったりしないのでとても使いやすいです。',
    authorName: '김정은',
    uploadAt: '2025-07-01T12:34:56Z',
  },
  {
    mediaList: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      },
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      },
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      },
    ],
    user: { name: '권동희', avatarUrl: '' },
    date: '2025年07月01日',
    likeCount: 45,
    brandName: 'ラネージュ',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    productName: 'リップスリーピングマスクプスリーピングマスク',
    productOption: '001グレーブラウン',
    rating: 3,
    isReceipt: true,
    positiveComment:
      '最近使い始めたこの化粧水と乳液のセット、本当に気に入っています。',
    negativeComment:
      '乳液もべたつかず、肌にすっとなじんでくれるのが嬉しいポイントです。朝のスキンケアのあとすぐにメイクをしても、ヨレたりテカったりしないのでとても使いやすいです。',
    authorName: '권동희',
    uploadAt: '2025-07-01T12:34:56Z',
  },
  {
    mediaList: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      },
    ],
    user: { name: '정희연', avatarUrl: '' },
    date: '2025年07月01日',
    likeCount: 454,
    brandName: 'ラネージュ',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    productName: 'リップスリーピングマスクプスリーピングマスク',
    productOption: '001グレーブラウン',
    rating: 3,
    isReceipt: true,
    positiveComment:
      '最近使い始めたこの化粧水と乳液のセット、本当に気に入っています。',
    negativeComment:
      '乳液もべたつかず、肌にすっとなじんでくれるのが嬉しいポイントです。朝のスキンケアのあとすぐにメイクをしても、ヨレたりテカったりしないのでとても使いやすいです。',
    authorName: '정희연',
    uploadAt: '2025-07-01T12:34:56Z',
  },
];

export default function Page() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleSwiperInit = (swiper: SwiperType) => {
    videoRefs.current = [];
    swiper.slides.forEach((slideEl) => {
      const videos = slideEl.querySelectorAll<HTMLVideoElement>('video');
      videos.forEach((video) => {
        videoRefs.current.push(video);
      });
    });

    if (videoRefs.current[0]) {
      videoRefs.current[0].play();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    videoRefs.current.forEach((video: HTMLVideoElement | null) => {
      if (video) video.pause();
    });

    const currentSlide = swiper.slides[swiper.activeIndex];
    if (currentSlide) {
      const currentVideos =
        currentSlide.querySelectorAll<HTMLVideoElement>('video');
      currentVideos.forEach((video) => {
        video.play();
      });
    }
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1.2}
      centeredSlides
      spaceBetween={-45}
      onSwiper={handleSwiperInit}
      onSlideChange={handleSlideChange}
      className="inset-0 h-screen w-screen bg-black/70"
    >
      {mediaList.map((review, idx) => (
        <SwiperSlide
          key={idx}
          className="flex h-[55.2rem] items-center justify-center"
        >
          <ReviewModalLayout
            mediaList={review.mediaList}
            user={review.user}
            date={review.date}
            likeCount={review.likeCount}
            //우측
            brandName={review.brandName}
            productName={review.productName}
            productOption={review.productOption}
            rating={review.rating}
            isReceipt={review.isReceipt}
            positiveComment={review.positiveComment}
            negativeComment={review.negativeComment}
            imageUrl={review.imageUrl}
            authorName={review.authorName}
            uploadAt={review.uploadAt}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
