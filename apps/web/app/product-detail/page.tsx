'use client';

import Carousel from './components/carousel';

// TODO: 이미지 목 데이터 추후 제거
const imageUrls = [
  '/images/swiper1.png',
  '/images/swiper2.png',
  '/images/swiper3.png',
  '/images/swiper4.png',
  '/images/swiper5.png',
  '/images/swiper6.png',
];

export default function Page() {
  return (
    <div>
      <Carousel imageUrlList={imageUrls} />
    </div>
  );
}
