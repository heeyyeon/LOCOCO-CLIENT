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

const MAX_RATING = 5;

interface ProductInfoProps {
  productId: number;
  imageUrls: string[];
  productName: string;
  brandName: string;
  unit: string;
  reviewCount: number;
  rating: number;
  isLiked: boolean;
  productOptions: string[];
  normalPrice: number;
  productDetail: string;
  ingredients: string;
  oliveYoungUrl: string | null;
  q10Url: string | null;
  middleCategory: string;
  subCategory: string;
}

export default function ProductInfo({
  productName,
  brandName,
  unit,
  reviewCount,
  rating,
  isLiked: initialIsLiked,
  productOptions,
  normalPrice,
  oliveYoungUrl,
  q10Url,
  // productDetail,
  // ingredients,
  // productId,
  // imageUrls,
  // middleCategory,
  // subCategory,
}: ProductInfoProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  return (
    <div className="flex flex-col justify-between">
      {/* 상품 정보 */}
      <div className="flex w-[48rem] flex-col gap-[1.2rem]">
        <div className="flex justify-between gap-[0.4rem]">
          <div className="flex flex-col gap-[0.6rem]">
            <h2 className="text-jp-title3 text-gray-700">{brandName}</h2>
            <h1 className="text-jp-head3 text-gray-800">{productName}</h1>
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
          <p className="text-red text-en-head2">¥{formatJPY(normalPrice)}</p>
          <p className="text-en-body1 text-gray-600"> {unit}</p>
          <div className="flex items-center gap-[0.4rem]">
            <SvgStar className="fill-yellow" />
            <span className="text-en-body1 text-gray-800">
              {rating}/{MAX_RATING}
            </span>
            <span className="text-en-body1 text-gray-600">({reviewCount})</span>
          </div>
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="オプション"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {productOptions.map((option: string) => (
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
              href={oliveYoungUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[0.8rem]"
            >
              <SvgPurchase /> カートに入れる
            </Link>
          </Button>

          <Button color="primary" variant="filled" rounded size="lg" asChild>
            <Link
              href={q10Url || '#'}
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
  );
}
