import CardProduct from 'components/card/card-product';
import CardReview from 'components/card/card-review';
import { CATEGORY_NAME, FACIAL_CARE } from 'constants/category';
import { inRange } from 'es-toolkit';
import { CategoryName } from 'types/category';
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components';
import Tab, { TabContainer } from '@/components/tab/Tab';

export default function HomeSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`flex w-full flex-col gap-8 mt-[12rem]${className}`}>
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
      <div className="flex justify-between">
        <CardProduct
          brandName="브랜드명"
          productName="아이템명"
          unit="50ml, 100ml"
          productId={1}
          isLiked={true}
          rating={4.2}
          reviewCount={123}
          imageUrl="https://media.istockphoto.com/id/1154370446/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B0%94%EC%9C%84-%EC%A0%9C%EC%8A%A4%EC%B2%98%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%85%B9%EC%83%89-%EC%84%A0%EA%B8%80%EB%9D%BC%EC%8A%A4%EC%97%90-%EC%9E%AC%EB%AF%B8-%EB%84%88%EA%B5%AC%EB%A6%AC.jpg?s=1024x1024&w=is&k=20&c=mopsJIVkM2O1h3_jVXT6HErRa4coSU4g31IDbwDv2H4="
          {...(inRange(1, 1, 3) && { rank: 1 })}
          handleCardClick={() => console.log('')}
        />
        <CardProduct
          brandName="브랜드명"
          productName="아이템명"
          unit="50ml, 100ml"
          productId={1}
          isLiked={true}
          rating={4.2}
          reviewCount={123}
          imageUrl="https://media.istockphoto.com/id/1154370446/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B0%94%EC%9C%84-%EC%A0%9C%EC%8A%A4%EC%B2%98%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%85%B9%EC%83%89-%EC%84%A0%EA%B8%80%EB%9D%BC%EC%8A%A4%EC%97%90-%EC%9E%AC%EB%AF%B8-%EB%84%88%EA%B5%AC%EB%A6%AC.jpg?s=1024x1024&w=is&k=20&c=mopsJIVkM2O1h3_jVXT6HErRa4coSU4g31IDbwDv2H4="
          {...(inRange(1, 1, 3) && { rank: 1 })}
          handleCardClick={() => console.log('')}
        />
        <CardProduct
          brandName="브랜드명"
          productName="아이템명"
          unit="50ml, 100ml"
          productId={1}
          isLiked={true}
          rating={4.2}
          reviewCount={123}
          imageUrl="https://media.istockphoto.com/id/1154370446/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B0%94%EC%9C%84-%EC%A0%9C%EC%8A%A4%EC%B2%98%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%85%B9%EC%83%89-%EC%84%A0%EA%B8%80%EB%9D%BC%EC%8A%A4%EC%97%90-%EC%9E%AC%EB%AF%B8-%EB%84%88%EA%B5%AC%EB%A6%AC.jpg?s=1024x1024&w=is&k=20&c=mopsJIVkM2O1h3_jVXT6HErRa4coSU4g31IDbwDv2H4="
          {...(inRange(1, 1, 3) && { rank: 1 })}
          handleCardClick={() => console.log('')}
        />
        <CardProduct
          brandName="브랜드명"
          productName="아이템명"
          unit="50ml, 100ml"
          productId={1}
          isLiked={true}
          rating={4.2}
          reviewCount={123}
          imageUrl="https://media.istockphoto.com/id/1154370446/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B0%94%EC%9C%84-%EC%A0%9C%EC%8A%A4%EC%B2%98%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%85%B9%EC%83%89-%EC%84%A0%EA%B8%80%EB%9D%BC%EC%8A%A4%EC%97%90-%EC%9E%AC%EB%AF%B8-%EB%84%88%EA%B5%AC%EB%A6%AC.jpg?s=1024x1024&w=is&k=20&c=mopsJIVkM2O1h3_jVXT6HErRa4coSU4g31IDbwDv2H4="
          {...(inRange(1, 1, 3) && { rank: 1 })}
          handleCardClick={() => console.log('')}
        />
      </div>
    </div>
  );
}

interface HomeSectionReviewProps {
  type: 'video' | 'image';
  className?: string;
}
function HomeSectionReview({ type, className }: HomeSectionReviewProps) {
  return (
    <div className={`mt-8 flex flex-col gap-8 ${className}`}>
      <p className="text-jp-head3 font-[700]">
        {type === 'video' && '영상 리뷰'}
        {type === 'image' && '사진 리뷰'}
      </p>
      <div className="flex gap-6">
        <CardReview
          type={type}
          brandName="브랜드명"
          productName="상품명"
          reviewId={1}
          likeCount={123}
        >
          <Button color="primary" variant="outline" size="lg">
            보러가기
          </Button>
        </CardReview>
        <CardReview
          type={type}
          brandName="브랜드명"
          productName="상품명"
          reviewId={1}
          likeCount={123}
        >
          <Button color="primary" variant="outline" size="lg">
            보러가기
          </Button>
        </CardReview>
        <CardReview
          type={type}
          brandName="브랜드명"
          productName="상품명"
          reviewId={1}
          likeCount={123}
        >
          <Button color="primary" variant="outline" size="lg">
            보러가기
          </Button>
        </CardReview>
        <CardReview
          type={type}
          brandName="브랜드명"
          productName="상품명"
          reviewId={1}
          likeCount={123}
        >
          <Button color="primary" variant="outline" size="lg">
            보러가기
          </Button>
        </CardReview>
      </div>
    </div>
  );
}
HomeSection.Header = HomeSectionHeader;
HomeSection.Product = HomeSectionProduct;
HomeSection.Review = HomeSectionReview;
