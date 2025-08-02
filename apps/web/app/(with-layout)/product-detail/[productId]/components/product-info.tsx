'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useProductLike } from 'components/card/hooks/use-product-like';
import { formatJPY } from 'utils/formatJPY';

import { Button } from '@lococo/design-system/button';
import { IconButton } from '@lococo/design-system/icon-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@lococo/design-system/select';
import {
  SvgLikeFill,
  SvgLikeOutline,
  SvgPurchase,
  SvgStar,
  SvgWrite,
} from '@lococo/icons';
import { cn } from '@lococo/utils';

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
  authStatus: boolean;
}

export default function ProductInfo({
  productId,
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
  authStatus,
}: ProductInfoProps) {
  const params = useParams();
  const router = useRouter();
  const { likeMutation, isLiked, goToLogin } = useProductLike({
    initialIsLiked,
  });
  const handleUserLike = () => {
    if (authStatus) {
      likeMutation.mutate(productId);
    } else {
      goToLogin();
    }
  };
  return (
    <div className="flex flex-col justify-between">
      {/* 상품 정보 */}
      <div className="flex w-[48rem] flex-col gap-[1.2rem]">
        <div className="flex justify-between gap-[0.4rem]">
          <div className="flex flex-col gap-[0.6rem]">
            <h2 className="jp-title3 font-bold text-gray-700">{brandName}</h2>
            <h1 className="jp-head3 font-bold text-gray-800">{productName}</h1>
          </div>
          <IconButton
            onClick={() => handleUserLike()}
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
            <span className="en-body1 text-gray-800">
              {rating}/{MAX_RATING}
            </span>
            <span className="en-body1 text-gray-600">({reviewCount})</span>
          </div>
        </div>
        {productOptions.length > 0 && (
          <Select>
            <SelectTrigger
              className="jp-body2 text-gray-800"
              disabled={productOptions.length === 0}
            >
              <SelectValue placeholder="オプション" />
            </SelectTrigger>
            <SelectContent className="jp-body2 text-gray-800">
              {productOptions.map((option) => (
                <SelectItem value={option.optionName} key={option.id} disabled>
                  {option.optionName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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
        <Button
          color="secondary"
          variant="filled"
          rounded
          size="lg"
          className="jp-title2 font-bold"
          onClick={() => {
            if (authStatus) {
              router.push(`/product-detail/${params.productId}/write-review`, {
                scroll: false,
              });
            } else {
              goToLogin();
            }
          }}
        >
          <SvgWrite /> レビューを書く
        </Button>
      </div>
    </div>
  );
}
