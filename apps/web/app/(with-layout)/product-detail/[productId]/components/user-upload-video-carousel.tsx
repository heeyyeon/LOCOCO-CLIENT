'use client';

import { useQuery } from '@tanstack/react-query';
import CardReview from 'components/card/card-review';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { IconButton } from '@lococo/design-system';
import { SvgArrowRight } from '@/icons';
import { getUserUploadedVideoList } from '../apis';
import './user-uploaded-video-carousel.css';

export default function UserUploadVideoCarousel() {
  const params = useParams();
  const router = useRouter();

  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isNextButton, setIsNextButton] = useState(true);
  const [isPrevButton, setIsPrevButton] = useState(false);

  const { data: userUploadedVideoList } = useQuery({
    queryKey: ['userUploadedVideoList', Number(params.productId)],
    // queryFn: () => getUserUploadedVideoList(Number(params.productId)),
    queryFn: () => getUserUploadedVideoList(61),
  });

  const userUploadedVideoListData = userUploadedVideoList?.videoReviews;
  const handleSwiper = (swiper: SwiperType) => {
    setSwiperRef(swiper);
    if (
      userUploadedVideoListData &&
      userUploadedVideoListData.length - 4 === swiper.activeIndex
    ) {
      setIsNextButton(false);
    } else {
      setIsNextButton(true);
    }
    if (swiper.activeIndex === 0) {
      setIsPrevButton(false);
    } else {
      setIsPrevButton(true);
    }
  };

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={handleSwiper}
        slidesPerView={4.5}
        slidesPerGroup={1}
        centeredSlides={true}
        onSlideChange={handleSwiper}
        spaceBetween={24}
        pagination={{
          type: 'fraction',
          clickable: true,
        }}
        navigation={false}
        modules={[Navigation]}
        className="user-uploaded-video--swiper"
      >
        {userUploadedVideoListData?.map((video) => (
          <SwiperSlide key={video.reviewId}>
            <CardReview
              type="video"
              brandName={video.brandName}
              productName={video.productName}
              likeCount={video.likeCount}
              reviewId={video.reviewId}
              mediaUrl={video.videoUrl}
              handleCardClick={() => {
                router.push(`/review-modal/${video.reviewId}/video`);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isPrevButton && (
        <IconButton
          className="absolute bottom-[3rem] left-[3rem] top-1/2 z-10 size-[3.2rem] -translate-y-1/2 bg-white p-0"
          onClick={() => swiperRef?.slidePrev()}
          size="md"
          icon={<SvgArrowRight className="rotate-180" />}
          color="tertiary"
          rounded
        />
      )}

      {isNextButton && (
        <IconButton
          className="absolute bottom-[3rem] right-[3rem] top-1/2 z-10 size-[3.2rem] shrink-0 bg-white p-0"
          onClick={() => swiperRef?.slideNext()}
          size="md"
          icon={<SvgArrowRight />}
          rounded
          color="tertiary"
        />
      )}
    </div>
  );
}
