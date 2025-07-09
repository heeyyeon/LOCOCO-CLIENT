'use client';

import { formatJPY } from 'utils/formatJPY';
import { useState } from 'react';
import Link from 'next/link';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components';
import { Button } from '@/components/button';
import IconButton from '@/components/icon-button';
import { SvgLikeFill } from '@/icons';
import { SvgLikeOutline } from '@/icons';
import { SvgStar } from '@/icons';
import { SvgPurchase } from '@/icons';
import { cn } from '@/lib/utils';
import Carousel from './components/carousel';

const MAX_RATING = 5;
export default function Page() {
  const [isLiked, setIsLiked] = useState(false);
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
      '染めるように軽く、呼吸するようにやさしく肌にフィットし、薄くて完璧なベースを演出するフィッティングファンデーションです。シワ改善、紫外線カットの二重機能を持つファンデーションです。UV遮断指数はSPF35PA++です。',
    ingredients:
      'ソルビトールで発酵工法で得られた高分子保湿剤を含有し、しっかりした保湿膜を形成し、長くしっとりと維持されます。<br>肌をリラックスさせる4種類のエキスが含まれています。',
    oliveYoungUrl:
      'https://global.oliveyoung.com/product/detail?prdtNo=GA231020802',
    q10Url: null,
    middleCategory: 'FACE_MAKEUP',
    subCategory: 'FOUNDATION',
  };

  return (
    <div className="container mx-auto flex justify-center gap-[8.4rem] py-[3.2rem]">
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
          <div className="flex flex-col gap-[0.8rem]">
            <p className="text-red text-en-head2">
              ¥{formatJPY(data.normalPrice)}
            </p>
            <p className="text-en-body1 text-gray-600"> {data.unit}</p>
            <div className="flex items-center gap-[0.4rem]">
              <SvgStar className="fill-yellow" />
              <span className="text-en-body1 text-gray-800">
                {data.rating}/{MAX_RATING}
              </span>
              <span className="text-en-body1 text-gray-600">
                ({data.reviewCount})
              </span>
            </div>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="オプション"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {data.productOptions.map((option) => (
                <SelectItem value={option} key={option} disabled>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 버튼 레이어 */}
        <div className="flex flex-col gap-[1.2rem]">
          <div className="flex gap-[1.2rem]">
            <Button color="primary" variant="filled" rounded size="lg" asChild>
              <Link
                href={data.oliveYoungUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[0.8rem]"
              >
                <SvgPurchase /> カートに入れる
              </Link>
            </Button>

            <Button color="primary" variant="filled" rounded size="lg" asChild>
              <Link
                href={data.q10Url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[0.8rem]"
              >
                <SvgPurchase /> カートに入れる
              </Link>
            </Button>
          </div>
          <Button color="secondary" variant="filled" rounded size="lg" asChild>
            {/* 추후 리뷰 작성 모달 URL 연결 */}
            <Link href="/">カートに入れる</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
