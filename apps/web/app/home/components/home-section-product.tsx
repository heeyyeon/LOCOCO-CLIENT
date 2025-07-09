'use client';

import CardProduct from 'components/card/card-product';
import { CATEGORY_NAME, FACIAL_CARE } from 'constants/category';
import { productMock } from 'mocks/productMock';
import { CategoryName } from 'types/category';
import React, { useState } from 'react';
import Tab, { TabContainer } from '@/components/tab/Tab';

export default function HomeSectionProduct() {
  const [selectedTab, setSelectedTab] = useState<CategoryName>(
    FACIAL_CARE.name
  );

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
      <div className="flex justify-between">
        {productMock.map((product) => (
          <CardProduct
            key={product.productId}
            {...product}
            handleCardClick={() => console.log(product.productId)}
          />
        ))}
      </div>
    </div>
  );
}
