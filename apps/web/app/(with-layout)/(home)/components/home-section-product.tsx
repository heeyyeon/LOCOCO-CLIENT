'use client';

import CardProduct from 'components/card/card-product';
import { CATEGORY_NAME, FACIAL_CARE } from 'constants/category';
import { inRange } from 'es-toolkit';
import { productMock } from 'mocks/productMock';
import { CategoryName } from 'types/category';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tab, TabContainer } from '@/components/tab/Tab';

export default function HomeSectionProduct() {
  const [selectedTab, setSelectedTab] = useState<CategoryName>(
    FACIAL_CARE.name
  );
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-4">
      <TabContainer className="flex w-full items-end">
        {Object.values(CATEGORY_NAME).map((item) => {
          return (
            <Tab
              onClick={() => setSelectedTab(item)}
              key={item}
              label={item}
              variant="primary"
              active={item === selectedTab}
            />
          );
        })}
        <div className="h-full flex-1 border-b" />
      </TabContainer>
      <div className="grid grid-cols-4 gap-[2.4rem]">
        {productMock.map((product) => (
          <CardProduct
            key={product.productId}
            brandName={product.brandName}
            productName={product.productName}
            unit={product.unit}
            productId={product.productId}
            isLiked={product.isLiked}
            rating={product.rating}
            reviewCount={product.reviewCount}
            imageUrl={product.imageUrl}
            handleCardClick={() =>
              router.push(`/product-detail/${product.productId}`)
            }
            {...(product.ranking &&
              inRange(product.ranking, 1, 4) && { ranking: product.ranking })}
          />
        ))}
      </div>
    </div>
  );
}
