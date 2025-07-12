'use client';

import ProductDetailSection from './components/product-detail-section';
import Review from './components/review';
import StarRating from './components/star-rating';
import YoutubeCarousel from './components/youtube-carousel';

const data = {
  productId: 22,
  imageUrls: ['/images/swiper5.png', '/images/swiper6.png'],
  productName:
    'VDL カバーステインパーフェクティングファンデーション30ml (SPF35、PA++)',
  brandName: 'ブイディーエル',
  unit: '本品',
  reviewCount: 23123,
  rating: 4,
  isLiked: true,
  productOptions: [
    {
      id: 5,
      optionName: '[セット] A00 (+ミニセレニティクッション)',
    },
    {
      id: 6,
      optionName: '[セット] A01 (+ミニセレニティクッション)',
    },
    {
      id: 7,
      optionName: '[セット] A02 (+ミニセレニティクッション)',
    },
    {
      id: 8,
      optionName: '[セット] M01 (+ミニセレニティクッション)',
    },
    {
      id: 9,
      optionName: '[セット] V02 (+ミニセレニティクッション)',
    },
    {
      id: 10,
      optionName: '[セット] A00 (+ハンディファン, パフ)',
    },
    {
      id: 11,
      optionName: '[セット] M01 (+ハンディファン, パフ)',
    },
    {
      id: 12,
      optionName: '[セット] V01 (+ハンディファン, パフ)',
    },
    {
      id: 13,
      optionName: '[單品] A00',
    },
    {
      id: 14,
      optionName: '[單品] A01',
    },
    {
      id: 15,
      optionName: '[單品] A02',
    },
    {
      id: 16,
      optionName: '[單品] A03',
    },
    {
      id: 17,
      optionName: '[單品] M01',
    },
    {
      id: 18,
      optionName: '[單品] V01',
    },
    {
      id: 19,
      optionName: '[單品] V02',
    },
    {
      id: 20,
      optionName: '[單品] V03',
    },
    {
      id: 21,
      optionName: '[セット] V03 (+ハンディファン, パフ)',
    },
  ],
  normalPrice: 3796,
  productDetail:
    '染めるように軽く、呼吸するようにセット] M01 (+ミニセレニティクッション)セット] M01 (+ミニセレニティクッション)セット] M01 (+ミニセレニティクッション)セット] M01 (+ミニセレニティクッション)セット] M01 (+ミニセレニティクッション)やさしく肌にフィットし、薄くて完璧なベースを演出するフィッティングファンデーションです。シワ改善、紫外線カットの二重機能を持つファンデーションです。UV遮断指数はSPF35PA++です。',
  ingredients:
    'ソルビトールで発酵工法で得られた高分子保湿剤を含有し、しっかりした保湿膜を形成し、長くしっとりと維持されます。<br>肌をリラックスさせる4種類のエキスが含まれています。',
  oliveYoungUrl:
    'https://global.oliveyoung.com/product/detail?prdtNo=GA231020802',
  q10Url: null,
  middleCategory: 'FACE_MAKEUP',
  subCategory: 'FOUNDATION',
};

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="flex w-[133.6rem] items-center">
        <div className="flex w-full flex-col gap-[10rem] px-[11.9rem]">
          <ProductDetailSection {...data} />
          <YoutubeCarousel />
          <StarRating />
          <Review />
        </div>
      </div>
    </div>
  );
}
