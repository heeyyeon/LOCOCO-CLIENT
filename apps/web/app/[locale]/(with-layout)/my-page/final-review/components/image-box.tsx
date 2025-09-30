'use client';

import { useEffect } from 'react';
import { useRef } from 'react';

import Image from 'next/image';

interface ImageBoxProps {
  images: string[];
}
export default function ImageBox({ images }: ImageBoxProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current && images.length > 0) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [images.length]);

  return (
    <div className="flex h-[22rem] w-full items-center gap-[1.2rem] rounded-lg border border-solid border-pink-300 bg-pink-100 p-[1.2rem]">
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide grid auto-cols-max grid-rows-2 gap-x-[1.2rem] gap-y-[1.5rem] overflow-x-scroll"
        style={{ gridAutoFlow: 'column' }}
      >
        {images.map((item) => (
          <Image
            key={item}
            src={item}
            alt="image"
            width={100}
            height={100}
            className="h-[9.2rem] w-[9.2rem] rounded-[1.6rem] border border-gray-200 object-cover"
          />
        ))}
      </div>
    </div>
  );
}
