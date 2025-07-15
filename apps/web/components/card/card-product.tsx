'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCT_QUERIES } from 'app/(with-layout)/(home)/components/home-section-product';
import { apiRequest } from 'app/api/apiRequest';
import { ProductItem } from 'types/product';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Badge,
  SvgLikeFill,
  SvgLikeOutline,
  SvgStar,
} from '@lococo/design-system';

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
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const likeMutation = useMutation({
    mutationFn: (productId: number) => {
      return apiRequest({
        endPoint: `/api/likes/products/${productId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer `,
        },
      });
    },

    onMutate: async () => {
      setIsLiked(!isLiked);
      return { originalState: isLiked };
    },

    onError: (error, _variables, context) => {
      setIsLiked(context?.originalState || false);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERIES.ALL });
    },
  });

  const handleLikeClick = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    likeMutation.mutate(productId);
  };

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
        <button
          onClick={(e) => handleLikeClick(e, productId)}
          className="cursor-pointer"
        >
          {isLiked ? (
            <SvgLikeFill size={24} className="fill-pink-500" />
          ) : (
            <SvgLikeOutline size={24} className="fill-gray-500" />
          )}
        </button>
      </div>
      <div className="flex h-[4.4rem] items-center border-b-[0.1rem] border-dashed border-pink-500">
        <p className="jp-body2 font-[500]">{productName}</p>
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
