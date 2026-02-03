'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import CardProduct from 'components/card/card-product';
import CardSkeletonWrapper from 'components/card/card-skeleton';
import {
  MAIN_PRODUCTS_CATEGORY_KEYS,
  MainProductsCategoryKey,
} from 'constants/tab-category';

import { Tab, TabContainer } from '@lococo/design-system/tab';

import ProductNotFoundSection from '../../search/components/product-not-found';
import { getNewProductsByCategory } from '../utils/get-product-Item';

export default function HomeSectionNewProducts() {
  const [selectedTab, setSelectedTab] = useState<
    MainProductsCategoryKey | undefined
  >(undefined);

  const { data, isPending } = useQuery(
    getNewProductsByCategory({
      productCategory: selectedTab ?? undefined,
    })
  );

  const products = data?.data?.products ?? [];

  const handleCardClick = () => {
    // TODO
    return null;
  };

  return (
    <div className="flex flex-col items-start gap-[2.4rem]">
      <TabContainer>
        <Tab
          label="ALL"
          value="ALL"
          selected={selectedTab === undefined}
          onClick={() => setSelectedTab(undefined)}
        />
        {Object.entries(MAIN_PRODUCTS_CATEGORY_KEYS).map(([key, value]) => (
          <Tab
            key={key}
            label={formatCategoryName(value)}
            value={key}
            selected={selectedTab === key}
            onClick={() => setSelectedTab(key as MainProductsCategoryKey)}
          />
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
              isLiked={false}
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
