'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useQuery } from '@tanstack/react-query';

import { Tab, TabContainer } from '@lococo/design-system/tab';

import ProductsByBrand from './components/products-by-brand';
import ReviewsByBrand from './components/reviews-by-brand';
import { getProductAndReviewCount } from './utils/get-product-and-review-count';

function Reviews() {
  const [activeTab, setActiveTab] = useState<'products' | 'reviews'>(
    'products'
  );
  const t = useTranslations('reviews');
  const { data: countData } = useQuery(getProductAndReviewCount());

  const productCount = countData?.data?.productCount ?? 0;
  const reviewCount = countData?.data?.reviewCount ?? 0;

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsByBrand />;
      case 'reviews':
        return <ReviewsByBrand />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-[6rem] flex flex-col gap-[2.4rem]">
      <TabContainer className="w-full">
        <Tab
          label={`${t('products')} (${productCount})`}
          value="products"
          className="w-full max-w-[564px]"
          selected={activeTab === 'products'}
          onClick={() => setActiveTab('products')}
        />
        <Tab
          label={`${t('reviews')} (${reviewCount})`}
          value="reviews"
          className="w-full max-w-[564px]"
          selected={activeTab === 'reviews'}
          onClick={() => setActiveTab('reviews')}
        />
      </TabContainer>
      {renderContent()}
    </div>
  );
}

export default Reviews;
