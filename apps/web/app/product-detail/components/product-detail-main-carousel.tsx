'use client';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { IconButton } from '@lococo/design-system';
import { SvgArrowUp } from '@/icons';
import { SvgArrowDown } from '@/icons';
import { cn } from '@/lib/utils';
import './main-carousel.css';

interface CarouselProps {
  imageUrlList: string[];
}

export default function ProductDetailMainCarousel({
  imageUrlList,
}: CarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="flex gap-6">
      {/* Thumbnail Swiper (Vertical) */}
      <div className="flex flex-col items-center justify-between">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={5}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="mySwiper vertical"
        >
          {imageUrlList.map((imageUrl) => (
            <SwiperSlide key={imageUrl}>
              <Image
                src={imageUrl}
                alt="swiper thumbnail"
                width={60}
                height={60}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex w-[4.4rem] flex-col gap-1">
          <IconButton
            className={cn(
              isBeginning
                ? 'hover:cursor-default [&>svg]:fill-gray-500'
                : '[&>svg]:fill-gray-800'
            )}
            onClick={() => mainSwiperRef.current?.slidePrev()}
            aria-label="이전 이미지"
            icon={<SvgArrowUp />}
          />
          <IconButton
            className={cn(
              isEnd
                ? 'hover:cursor-default [&>svg]:fill-gray-500'
                : '[&>svg]:fill-gray-800'
            )}
            onClick={() => mainSwiperRef.current?.slideNext()}
            aria-label="다음 이미지"
            icon={<SvgArrowDown />}
          />
        </div>
      </div>

      {/* Main Swiper */}
      <div className="relative flex">
        <Swiper
          spaceBetween={30}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
          className="mainCustomSwiper"
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {imageUrlList.map((imageUrl, idx) => (
            <SwiperSlide key={imageUrl}>
              <Image
                src={imageUrl}
                alt="swiper main"
                width={600}
                height={400}
                className="h-full w-full object-cover"
                priority={idx === 0 ? true : false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
