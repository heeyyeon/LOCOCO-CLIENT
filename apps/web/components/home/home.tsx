import CardProduct from 'components/card/card-products';
import { CATEGORY_NAME, FACIAL_CARE } from 'constants/category';
import { inRange } from 'es-toolkit';
import { CategoryName } from 'types/category';
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import Tab, { TabContainer } from '@/components/tab/Tab';

export default function HomeSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`flex w-full flex-col ${className}`}>
      {children}
    </section>
  );
}

interface HomeSectionHeaderProps {
  title: string;
  moreInfoUrl?: string;
}
function HomeSectionHeader({ title, moreInfoUrl }: HomeSectionHeaderProps) {
  return (
    <section className="mt-[6rem] flex justify-between">
      <h3 className="text-jp-head1 font-[700]">{title}</h3>
      {moreInfoUrl && (
        <Link href={moreInfoUrl} className="text-jp-title2 font-[700]">
          더보기
        </Link>
      )}
    </section>
  );
}

function HomeSectionProduct() {
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
  );
}

function HomeSectionReview() {
  return <div></div>;
}
HomeSection.Header = HomeSectionHeader;
HomeSection.Product = HomeSectionProduct;
HomeSection.Review = HomeSectionReview;
