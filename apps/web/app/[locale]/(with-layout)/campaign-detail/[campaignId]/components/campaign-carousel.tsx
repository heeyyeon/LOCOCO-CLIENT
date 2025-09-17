'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn } from '@lococo/utils';

interface CampaignGalleryProps {
  images?: string[];
  campaignName?: string;
}

export default function CampaignCarousel({
  images,
  campaignName = 'Campaign',
}: CampaignGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  const defaultImages = [
    '/images/swiper1.png',
    '/images/swiper2.png',
    '/images/swiper3.png',
    '/images/swiper4.png',
    '/images/swiper5.png',
  ];

  const galleryImages = images || defaultImages;

  return (
    <div className="relative flex h-fit w-full max-w-[64.8rem] flex-1 gap-[12px] md:gap-[16px] lg:gap-[24px]">
      {/* Thumbnail Swiper (Vertical) */}
      <div
        className="absolute top-1/2 z-10 flex flex-col items-center justify-between"
        style={{ transform: 'translateY(-50%)' }}
      >
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={8}
          slidesPerView={5}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="left-[2.4rem] h-[40.8rem] w-[72px]"
        >
          {galleryImages.map((imageUrl, index) => (
            <SwiperSlide key={imageUrl}>
              <Image
                src={imageUrl}
                alt={`${campaignName} thumbnail`}
                width={72}
                height={72}
                className={cn(
                  'h-full w-full cursor-pointer rounded-[16px] object-cover',
                  activeThumbIndex === index && 'border-2 border-pink-500'
                )}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Swiper */}
      <div className="flex max-h-[636px] w-full max-w-[648px]">
        <Swiper
          spaceBetween={30}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
          className="h-[636px] w-full max-w-[648px]"
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
            setActiveThumbIndex(swiper.activeIndex);
          }}
          onSlideChange={(swiper) => {
            setActiveThumbIndex(swiper.activeIndex);
          }}
        >
          {galleryImages.map((imageUrl, idx) => (
            <SwiperSlide key={imageUrl}>
              <Image
                src={imageUrl}
                alt={`${campaignName}`}
                fill
                className="h-auto w-full object-cover"
                priority={idx === 0 ? true : false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
