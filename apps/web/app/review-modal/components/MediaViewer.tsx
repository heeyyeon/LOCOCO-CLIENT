'use client';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Progress, SvgPlayArrow, SvgPause } from '@lococo/design-system';
import { IconButton } from '@lococo/design-system';
import { SvgArrowUp, SvgArrowDown } from '@/icons';
import { cn } from '@/lib/utils';

type Media = { type: 'video' | 'image'; url: string };
interface MediaViewerProps {
  mediaList: Media[];
}

export default function MediaViewer({ mediaList }: MediaViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [progress, setProgress] = useState(0);
  const [overlay, setOverlay] = useState<null | 'play' | 'pause'>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const video = mediaList.find((m) => m.type === 'video');
  const images = mediaList.filter((m) => m.type === 'image');

  useEffect(() => {
    const videoPlayer = videoRef.current;
    if (!videoPlayer) return;

    const handleTimeUpdate = () => {
      setProgress((videoPlayer.currentTime / videoPlayer.duration) * 100);
    };

    videoPlayer.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      videoPlayer.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [video?.url]);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setOverlay('play');
      setTimeout(() => setOverlay(null), 300);
    } else {
      videoRef.current.pause();
      setOverlay('pause');
    }
  };

  const navBtnClass =
    'border-1 size-[3.2rem] -rotate-90 border-gray-200 bg-white';

  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-l-xl">
      {video && (
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            src={video.url}
            controls={false}
            muted
            loop
            playsInline
            className="h-full w-full cursor-pointer object-cover"
            onClick={handleVideoClick}
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity',
              overlay ? 'opacity-100' : 'opacity-0'
            )}
          >
            {overlay === 'play' && (
              <SvgPlayArrow className="size-[7.2rem] fill-white" />
            )}
            {overlay === 'pause' && (
              <SvgPause className="size-[7.2rem] fill-white" />
            )}
          </div>
          <Progress
            value={progress}
            height="0.25rem"
            className="absolute bottom-2 left-4 right-4 bg-gray-600"
          />
        </div>
      )}
      {images.length > 0 && (
        <>
          <Swiper
            direction="horizontal"
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setCurrentIndex(s.activeIndex)}
            className="absolute inset-0 h-full w-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={img.url}
                  alt="리뷰 이미지"
                  fill
                  className="relative h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {images.length > 1 && currentIndex > 0 && (
            <div className="absolute left-[1.2rem] top-1/2 z-20 -translate-y-1/2">
              <IconButton
                icon={<SvgArrowUp />}
                rounded
                color="secondary"
                aria-label="이전 이미지"
                onClick={() => swiperRef.current?.slidePrev()}
                className={navBtnClass}
              />
            </div>
          )}
          {images.length > 1 && currentIndex < images.length - 1 && (
            <div className="absolute right-[1.2rem] top-1/2 z-20 -translate-y-1/2">
              <IconButton
                icon={<SvgArrowDown />}
                rounded
                color="secondary"
                aria-label="다음 이미지"
                onClick={() => swiperRef.current?.slideNext()}
                className={navBtnClass}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
