'use client';

import Image from 'next/image';

import { ProductItem } from 'types/product';

import { Badge } from '@lococo/design-system/badge';
import { SvgStar } from '@lococo/icons';

interface CardProductProps extends ProductItem {
  handleCardClick: (productId: number) => void;
}

export default function CardProduct({
  ranking,
  brandName,
  productName,
  unit,
  productId,
  rating,
  reviewCount,
  imageUrl,
  handleCardClick,
}: CardProductProps) {
  return (
    <article
      className="flex w-[26.4rem] cursor-pointer flex-col"
      onClick={() => handleCardClick(productId)}
    >
      <div className="relative rounded-[1.6rem] border-[0.1rem] border-gray-200">
        {imageUrl ? (
          <Image
            height={264}
            width={264}
            className="h-[26.4rem] w-[26.4rem] rounded-[1.6rem] object-cover"
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
        <p className="body1 font-[700]">{brandName}</p>
      </div>
      <div className="flex h-[4.4rem] items-center border-b-[0.1rem] border-dashed border-pink-500">
        <p className="body2 w-full truncate font-[500]" title={productName}>
          {productName}
        </p>
      </div>
      <div className="caption1 flex h-[4.4rem] items-center justify-between border-b-[0.1rem] border-pink-500 text-gray-600">
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
