'use client';

import HorizontalCarousel from 'components/horizontal-carousel';
import { SvgKoreanReview } from '@/icons';
import ProductDetailMainCarousel from './components/product-detail-main-carousel';
import ProductInfo from './components/product-info';
import ProductInfoTab from './components/product-info-tab';

export default function Page() {
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
      '[セット] A00 (+ミニセレニティクッション)',
      '[セット] A01 (+ミニセレニティクッション)',
      '[セット] A02 (+ミニセレニティクッション)',
      '[セット] M01 (+ミニセレニティクッション)',
      '[セット] V02 (+ミニセレニティクッション)',
      '[セット] A00 (+ハンディファン, パフ)',
      '[セット] M01 (+ハンディファン, パフ)',
      '[セット] V01 (+ハンディファン, パフ)',
      '[單品] A00',
      '[單品] A01',
      '[單品] A02',
      '[單品] A03',
      '[單品] M01',
      '[單品] V01',
      '[單品] V02',
      '[單品] V03',
      '[セット] V03 (+ハンディファン, パフ)',
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

  return (
    <div className="flex min-w-max justify-center">
      <div className="relative flex w-[136.6rem] flex-col gap-[10rem] overflow-x-hidden pl-[11.9rem] pr-[11.9rem]">
        <div className="flex flex-col">
          <div className="flex justify-center gap-[8.4rem] overflow-x-auto pb-[6rem] pt-[3.2rem]">
            <ProductDetailMainCarousel imageUrlList={data.imageUrls} />
            <ProductInfo {...data} />
          </div>
          <ProductInfoTab
            productDetail={data.productDetail}
            ingredients={data.ingredients}
          />
        </div>

        <div className="flex flex-col gap-[3.2rem]">
          <h3 className="text-jp-head2 inline-flex items-center gap-[1.2rem] font-bold text-gray-800">
            <SvgKoreanReview size={24} /> 韓国ユーチューバーレビュー
          </h3>

          <HorizontalCarousel />
        </div>
      </div>
    </div>
  );
}
