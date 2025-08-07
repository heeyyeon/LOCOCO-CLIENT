'use client';

import Image from 'next/image';

import { ProductItem } from 'types/product';

import { Badge } from '@lococo/design-system/badge';
import { IconButton } from '@lococo/design-system/icon-button';
import { SvgLikeFill, SvgLikeOutline, SvgStar } from '@lococo/icons';
import { cn } from '@lococo/utils';

import { useProductLike } from './hooks/use-product-like';

interface CardProductProps extends ProductItem {
  handleCardClick: (productId: number) => void;
}

export default function CardProduct({
  ranking,
  brandName,
  productName,
  unit,
  productId,
  isLiked: initialIsLiked,
  rating,
  reviewCount,
  imageUrl,
  handleCardClick,
}: CardProductProps) {
  const { isLiked, handleLikeClick } = useProductLike({
    initialIsLiked,
  });

  return (
    <article
      className="flex w-[26.4rem] cursor-pointer flex-col"
      onClick={() => handleCardClick?.(productId)}
    >
      <div className="relative border-[0.1rem] border-gray-200">
        {imageUrl ? (
          <Image
            height={264}
            width={264}
            className="h-[26.4rem] w-[26.4rem] object-cover"
            src={imageUrl}
            alt={productName}
          />
        ) : (
          <div className="flex h-[26.4rem] w-[26.4rem] items-center justify-center">
            상품 이미지 준비중
          </div>
        )}
        {ranking && <Badge rank={ranking} />}
      </div>
      <div className="flex h-[4.4rem] items-center justify-between border-b-[0.1rem] border-dashed border-pink-500">
        <p className="jp-body1 font-[700]">{brandName}</p>
        <IconButton
          onClick={(e) => handleLikeClick(productId, e)}
          size="md"
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
      <div className="flex h-[4.4rem] items-center border-b-[0.1rem] border-dashed border-pink-500">
        <p className="jp-body2 w-full truncate font-[500]" title={productName}>
          {productName}
        </p>
      </div>
      <div className="en-caption1 flex h-[4.4rem] items-center justify-between border-b-[0.1rem] border-pink-500 text-gray-600">
        <p>{unit}</p>
        <div className="flex items-center">
          <SvgStar size={16} className="fill-yellow" />
          <p>
            {rating}/5({reviewCount})
          </p>
        </div>
      </div>
    </article>
  );
}
