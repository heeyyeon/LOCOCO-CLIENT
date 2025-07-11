'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Progress, SvgPlayArrow, SvgPause } from '@lococo/design-system';
import { SvgArrowUp } from '@/icons';
import { SvgArrowDown } from '@/icons';

type Media = { type: 'video' | 'image'; url: string };

interface MediaViewerProps {
  mediaList: Media[];
  user: { name: string; avatarUrl?: string };
  date: string;
  likeCount: number;
}

export default function MediaViewer({ mediaList }: MediaViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [overlay, setOverlay] = useState<null | 'play' | 'pause'>(null);

  // 비디오 이벤트 리스너 등록
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => setProgress((vid.currentTime / vid.duration) * 100);
    vid.addEventListener('timeupdate', onTime);
    return () => {
      vid.removeEventListener('timeupdate', onTime);
    };
  }, [mediaList]);

  // 슬라이드 전환 시 비디오 리셋
  const onSlideChange = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  // 비디오 클릭 시 재생/일시정지 및 오버레이 아이콘 표시
  const handleVideoClick = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setOverlay('play');
      setTimeout(() => setOverlay(null), 300);
    } else {
      vid.pause();
      setOverlay('pause');
    }
  };

  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-l-xl bg-black">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        centeredSlides
        spaceBetween={16}
        className="h-full w-full"
        onSlideChange={onSlideChange}
      >
        {mediaList.map((media, idx) => (
          <SwiperSlide
            key={idx}
            className="relative h-[calc(100%-4rem)] w-full"
          >
            {media.type === 'video' ? (
              <div className="relative h-full w-full">
                <video
                  ref={videoRef}
                  src={media.url}
                  controls={false}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full cursor-pointer object-cover"
                  onClick={handleVideoClick}
                />

                {/* Overlay 아이콘 */}
                <div
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                    overlay ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {overlay === 'play' ? (
                    <SvgPlayArrow className="size-[7.2rem] fill-white" />
                  ) : overlay === 'pause' ? (
                    <SvgPause className="size-[7.2rem] fill-white" />
                  ) : null}
                </div>

                {/* Progress 컴포넌트 */}
                <div className="absolute bottom-2 left-4 right-4 z-20 cursor-pointer">
                  <Progress
                    value={progress}
                    height="0.25rem"
                    className="bg-gray-600"
                  />
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={media.url}
                  alt="리뷰 이미지"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
