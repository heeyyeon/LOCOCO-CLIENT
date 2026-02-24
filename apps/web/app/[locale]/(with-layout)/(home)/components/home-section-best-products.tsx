'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import CardProduct from 'components/card/card-product';
import CardSkeletonWrapper from 'components/card/card-skeleton';
import {
  MAIN_PRODUCTS_CATEGORY_KEYS,
  MainProductsCategoryKey,
} from 'constants/tab-category';

import { Tab, TabContainer } from '@lococo/design-system/tab';

import ProductNotFoundSection from '../../search/components/product-not-found';
import { getPopularProductsByCategory } from '../utils/get-product-Item';

const tabItems = (
  Object.keys(MAIN_PRODUCTS_CATEGORY_KEYS) as MainProductsCategoryKey[]
).map((key) => ({
  key,
  label: key === 'ALL' ? 'ALL' : formatCategoryName(key),
}));

export default function HomeSectionBestProducts() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] =
    useState<MainProductsCategoryKey>('ALL');

  const { data, isPending } = useQuery(
    getPopularProductsByCategory({
      productCategory: selectedTab === 'ALL' ? undefined : selectedTab,
    })
  );

  const products = data?.data?.products ?? [];

  const handleCardClick = (productId: number) => {
    router.push(`/product-detail/${productId}`);
  };

  return (
    <div className="flex flex-col items-start gap-[2.4rem]">
      <TabContainer className="flex items-center">
        {tabItems.map((item, index) => (
          <div key={String(item.key)} className="flex items-center">
            {index !== 0 && (
              <span className="title2 mx-[1.2rem] font-[700] text-gray-300">
                /
              </span>
            )}
            <Tab
              value={item.key}
              label={item.label}
              selected={selectedTab === item.key}
              onClick={() => setSelectedTab(item.key)}
            />
          </div>
        ))}
      </TabContainer>
      <div className="flex w-full flex-wrap items-center gap-[2.4rem]">
        {isPending ? (
          <CardSkeletonWrapper type="PRODUCT" />
        ) : products.length > 0 ? (
          products.map((product) => (
            <CardProduct
              key={product.productId}
              brandName={product.brandName}
              productName={product.productName}
              unit={product.unit}
              productId={product.productId}
              rating={product.avgRating}
              reviewCount={product.reviewCount}
              imageUrl={product.imageUrl}
              handleCardClick={handleCardClick}
            />
          ))
        ) : (
          <ProductNotFoundSection />
        )}
      </div>
    </div>
  );
}

function formatCategoryName(categoryName: string) {
  return categoryName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
