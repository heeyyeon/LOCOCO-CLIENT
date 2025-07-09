'use client';

import { useState } from 'react';
import IconButton from '@/components/icon-button';
import { SvgLikeFill } from '@/icons';
import { SvgLikeOutline } from '@/icons';
import { cn } from '@/lib/utils';
import Carousel from './components/carousel';

export default function Page() {
  const [isLiked, setIsLiked] = useState(false);
  const data = {
    productId: 123456,
    imageUrls: ['/images/swiper5.png', '/images/swiper6.png'],
    productName:
      '수분 가득 토너수분 가득 토너수분 가득 토너수분 가득 토너수분 가득 토너수분 가득 토너',
    brandName: '뷰티브랜드',
    unit: '150ml',
    reviewCount: 256,
    rating: 4.5,
    isLiked: true,
    productOptions: [
      {
        optionName: '19호',
        normalPrice: 25000,
      },
      {
        optionName: '20호',
        normalPrice: 26000,
      },
    ],
    productDetail: '피부에 수분을 공급해주는 촉촉한 토너입니다.',
    ingredients: '정제수, 글리세린, 판테놀, 알로에베라잎추출물',
    oliveYoungUrl:
      'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=123456',
    q10Url: 'https://www.qoo10.com/item/123456',
    middleCategory: '스킨케어',
    subCategory: '토너',
  };

  return (
    <div className="container mx-auto flex gap-[8.4rem] py-[3.2rem]">
      <Carousel imageUrlList={data.imageUrls} />
      <div className="flex flex-col justify-between">
        {/* 상품 정보 */}
        <div className="flex w-[48rem] flex-col gap-[1.2rem]">
          <div className="flex justify-between gap-[0.4rem]">
            <div className="flex flex-col gap-[0.6rem]">
              <h2 className="text-jp-title3 text-gray-700">{data.brandName}</h2>
              <h1 className="text-jp-head3 text-gray-800">
                {data.productName}
              </h1>
            </div>
            <IconButton
              onClick={() => setIsLiked(!isLiked)}
              size="lg"
              icon={
                isLiked ? (
                  <SvgLikeFill />
                ) : (
                  <SvgLikeOutline
                    className={cn(isLiked ? 'text-pink-500' : 'text-white')}
                  />
                )
              }
              color={isLiked ? 'primary' : 'tertiary'}
            />
          </div>
        </div>

        {/* 버튼 레이어 */}
      </div>
    </div>
  );
}
