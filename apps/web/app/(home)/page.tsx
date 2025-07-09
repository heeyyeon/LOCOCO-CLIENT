'use client';

import CardProduct from 'components/card/card-product';
import { CATEGORY_NAME, FACIAL_CARE } from 'constants/category';
import { inRange } from 'es-toolkit';
import { CategoryName } from 'types/category';
import { useState } from 'react';
import { Tab } from '@/components';
import { TabContainer } from '@/components/tab/Tab';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<CategoryName>(
    FACIAL_CARE.name
  );
  return (
    <main className="min-h-[100vh] w-screen px-[11.9rem]">
      <article className="flex flex-col">
        <section className="mt-[4rem] flex justify-end">
          <p className="text-jp-body2 font-[500] text-gray-600">更新日時 :</p>
          <p className="text-en-body2 font-[500] text-gray-600">업뎃날짜</p>
        </section>
        <section className="flex w-full">
          <div className="mt-[6rem] flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-jp-head1 font-[700]">レビュー数が多い商品</h3>
            </div>
            <TabContainer className="flex w-full items-center">
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
            <div className="flex gap-[2.4rem]">
              <CardProduct
                brand="브랜드명"
                title="아이템명"
                description="50ml, 100ml"
                productId={1}
                isLiked={true}
                rating={4.2}
                reviewCount={123}
                likeCount={999}
                {...(inRange(1, 1, 3) && { rank: 1 })}
              />
              <CardProduct
                brand="브랜드명"
                title="아이템명"
                description="50ml, 100ml"
                productId={1}
                isLiked={true}
                rating={4.2}
                reviewCount={123}
                likeCount={999}
                {...(inRange(2, 1, 3) && { rank: 2 })}
              />
              <CardProduct
                brand="브랜드명"
                title="아이템명"
                description="50ml, 100ml"
                productId={1}
                isLiked={true}
                rating={4.2}
                reviewCount={123}
                likeCount={999}
                {...(inRange(3, 1, 3) && { rank: 3 })}
              />
              <CardProduct
                brand="브랜드명"
                title="아이템명"
                description="50ml, 100ml"
                productId={1}
                isLiked={true}
                rating={4.2}
                reviewCount={123}
                likeCount={999}
                {...(inRange(4, 1, 3) && { rank: 4 })}
              />
            </div>
          </div>
        </section>
        <section className="mt-[12rem] flex w-full flex-col gap-[1.6rem]"></section>
        <section></section>
        <section></section>
      </article>
    </main>
  );
}
