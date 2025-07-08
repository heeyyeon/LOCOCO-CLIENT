'use client';

import CardProduct from 'components/card/card-products';
import { inRange } from 'es-toolkit';
import { Tab } from '@/components';
import { TabContainer } from '@/components/tab/Tab';

export default function Home() {
  return (
    <main className="min-h-[100vh] w-screen px-[11.9rem]">
      <article className="flex flex-col">
        <section className="mt-[4rem] flex justify-end">
          <p className="text-jp-body2 font-[500] text-gray-600">更新日時 :</p>
          <p className="text-en-body2 font-[500] text-gray-600">업뎃날짜</p>
        </section>
        <section className="flex w-full">
          <div className="mt-[6rem] flex w-full flex-col gap-[1.6rem]">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-jp-head1 font-[700]">리뷰 많은 상품</h3>
              <p className="text-jp-title2 font-[700]">더보기</p>
            </div>
            <TabContainer className="flex w-full items-center">
              <Tab label="스킨케어" variant="primary" active={true} />
              <Tab label="스킨케어" variant="primary" active={false} />
              <Tab label="스킨케어" variant="primary" active={false} />
              <Tab label="스킨케어" variant="primary" active={false} />
              <Tab label="스킨케어" variant="primary" active={false} />
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
                rank={1}
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
                rank={2}
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
                rank={3}
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
        <section></section>
        <section></section>
        <section></section>
      </article>
    </main>
  );
}
