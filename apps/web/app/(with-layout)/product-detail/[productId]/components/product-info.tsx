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
} from '@lococo/design-system';
import { Button } from '@lococo/design-system';
import { IconButton } from '@lococo/design-system';
import { SvgLikeFill } from '@/icons';
import { SvgLikeOutline } from '@/icons';
import { SvgStar } from '@/icons';
import { SvgPurchase } from '@/icons';
import { SvgWrite } from '@/icons';
import { cn } from '@/lib/utils';

const MAX_RATING = 5;

interface ProductInfoProps {
  productId: number;
  productName: string;
  normalPrice: number;
  brandName: string;
  unit: string;
  reviewCount: number;
  rating: number;
  isLiked: boolean;
  productOptions: {
    id: number;
    optionName: string;
  }[];
  oliveYoungUrl: string;
  q10Url: string;
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
}: ProductInfoProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  return (
    <div className="flex flex-col justify-between">
      {/* 상품 정보 */}
      <div className="flex w-[48rem] flex-col gap-[1.2rem]">
        <div className="flex justify-between gap-[0.4rem]">
          <div className="flex flex-col gap-[0.6rem]">
            <h2 className="text-jp-title3 font-bold text-gray-700">
              {brandName}
            </h2>
            <h1 className="text-jp-head3 font-bold text-gray-800">
              {productName}
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
                  className={cn(isLiked ? 'text-pink-500' : 'text-gray-500')}
                />
              )
            }
            color={isLiked ? 'primary' : 'tertiary'}
          />
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <p className="text-red en-head2 font-bold">
            ¥{formatJPY(normalPrice)}
          </p>
          <p className="jp-body2 text-gray-600"> {unit}</p>
          <div className="flex items-center gap-[0.4rem]">
            <SvgStar className="fill-yellow" />
            <span className="text-en-body1 text-gray-800">
              {rating}/{MAX_RATING}
            </span>
            <span className="text-en-body1 text-gray-600">({reviewCount})</span>
          </div>
        </div>
        <Select>
          <SelectTrigger className="jp-body2 text-gray-800">
            <SelectValue placeholder="オプション"></SelectValue>
          </SelectTrigger>
          <SelectContent className="jp-body2 text-gray-800">
            {productOptions.map((option) => (
              <SelectItem value={option.optionName} key={option.id} disabled>
                {option.optionName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 버튼 레이어 */}
      <div className="flex flex-col gap-[1.2rem]">
        <div className="flex justify-between gap-[1.2rem]">
          <Button
            color="primary"
            variant="filled"
            rounded
            size="lg"
            asChild
            className="flex-1"
          >
            <Link
              href={q10Url}
              target="_blank"
              rel="noopener noreferrer"
              className="jp-title2 flex items-center gap-[0.8rem] font-bold"
            >
              <SvgPurchase /> Qoo10
            </Link>
          </Button>

          <Button
            color="primary"
            variant="filled"
            rounded
            size="lg"
            asChild
            className="flex-1"
          >
            <Link
              href={oliveYoungUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="jp-title2 flex items-center gap-[0.8rem] font-bold"
            >
              <SvgPurchase /> Olive Young
            </Link>
          </Button>
        </div>
        <Button color="secondary" variant="filled" rounded size="lg" asChild>
          {/* 추후 리뷰 작성 모달 URL 연결 */}
<<<<<<< HEAD:apps/web/app/(with-layout)/product-detail/components/product-info.tsx
          <Link href="/product-detail/write-review" className="jp-title2">
            <SvgWrite /> レビューを書く
=======
          <Link
            // href={`/product-detail/${params.productId}/write-review`}
            href=""
            className="jp-title2"
          >
            <SvgWrite /> カートに入れる
>>>>>>> develop:apps/web/app/(with-layout)/product-detail/[productId]/components/product-info.tsx
          </Link>
        </Button>
      </div>
    </div>
  );
}
