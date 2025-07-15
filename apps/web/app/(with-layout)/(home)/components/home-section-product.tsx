'use client';

import { useQuery } from '@tanstack/react-query';
import { ApiResponseCategoryNewProductResponse } from 'api/data-contracts';
import { apiRequest } from 'app/api/apiRequest';
import CardProduct from 'components/card/card-product';
import { CATEGORY_NAME } from 'constants/category';
import { CategoryNameEng } from 'types/category';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tab, TabContainer } from '@/components/tab/Tab';

type ProductSortType = 'new' | 'popular';

interface HomeSectionProductProps {
  productSortType: ProductSortType;
}

export const productQueries = {
  ALL: ['product'],
  LISTS: () => [...productQueries.ALL, 'list'],
  SEARCH_TYPE: (category: CategoryNameEng, sortType: ProductSortType) => [
    ...productQueries.ALL,
    'search',
    sortType,
    category,
  ],
  CATEGORIES: (category: CategoryNameEng, sortType: ProductSortType) => [
    ...productQueries.ALL,
    'categories',
    category,
    sortType,
  ],
  DETAILS: (detailId: number) => [...productQueries.ALL, 'detail', detailId],
} as const;

export default function HomeSectionProduct({
  productSortType = 'new',
}: HomeSectionProductProps) {
  const [selectedTab, setSelectedTab] =
    useState<CategoryNameEng>('FACIAL_CARE');
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: [productQueries.CATEGORIES(selectedTab, productSortType)],
    queryFn: () =>
      apiRequest<ApiResponseCategoryNewProductResponse>({
        endPoint: `/api/products/categories/${productSortType}?middleCategory=${selectedTab}&page=0&size=4`,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMyIsImlhdCI6MTc1MjUxNzc3OSwiZXhwIjoxNzUzMTIyNTc5LCJpZCI6MTMsInJvbGUiOiJST0xFX1VTRVIiLCJsaW5lSWQiOiIxMyJ9.of-F1I4NjdyaHpTVrq1t_Bj-n9yjVWopZ_gaSPJfx2k`,
        },
      }),
  });

  const products = data?.data?.products;
  console.log(products);

  return (
    <div className="flex w-full flex-col gap-4">
      <TabContainer className="flex w-full items-end">
        {Object.entries(CATEGORY_NAME).map(([key, name]) => {
          return (
            <Tab
              onClick={() => setSelectedTab(key)}
              key={key}
              label={name}
              variant="primary"
              active={key === selectedTab}
            />
          );
        })}
        <div className="h-full flex-1 border-b" />
      </TabContainer>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error occurred</div>}

      <div className="flex justify-between">
        {products?.map((product, index) => (
          <CardProduct
            key={product.productId}
            brandName={product.brandName || ''}
            productName={product.productName || ''}
            unit={product.unit || ''}
            productId={product.productId || 0}
            isLiked={product.isLiked || false}
            rating={product.rating || 0}
            reviewCount={product.reviewCount || 0}
            imageUrl={product.imageUrls?.[0]}
            handleCardClick={() =>
              router.push(`/product-detail/${product.productId}`)
            }
            {...(index >= 0 && index < 3 && { ranking: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
}
