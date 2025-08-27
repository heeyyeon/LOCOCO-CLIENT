'use client';

import { useRouter } from 'next/navigation';

import CardProduct from 'components/card/card-product';
import CardSkeletonWrapper from 'components/card/card-skeleton';

import useProductSectionData from '../hook/use-product-section';
import NotFoundSection from './not-found-section';

export default function SearchProductsSection() {
  const { products, isLoading, hasError } = useProductSectionData();
  const router = useRouter();

  const handleCardClick = (productId: number) => {
    router.push(`/product-detail/${productId}`);
  };

  if (isLoading) {
    return (
      <section className="mx-auto flex w-[1366px] flex-col items-center justify-center px-[11.9rem] pb-[12rem] pt-[3.2rem]">
        <CardSkeletonWrapper type="PRODUCT" />
      </section>
    );
  }

  if (hasError) {
    return (
      <section className="mx-auto flex w-[1366px] flex-col items-center justify-center px-[11.9rem] pb-[12rem] pt-[3.2rem]">
        <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
      </section>
    );
  }

  return (
    <>
      {products.length === 0 ? (
        <NotFoundSection variant="product" />
      ) : (
        <section className="mx-auto grid w-[1366px] grid-cols-4 gap-[2.4rem] px-[11.9rem] pb-[12rem] pt-[3.2rem]">
          <div className="flex w-[112.8rem] flex-wrap content-center gap-[2.4rem]">
            {products.map(
              ({
                productId,
                brandName,
                productName,
                unit,
                isLiked,
                rating,
                reviewCount,
                url,
              }) => (
                <CardProduct
                  key={productId}
                  brandName={brandName}
                  productName={productName}
                  unit={unit}
                  productId={productId || 0}
                  isLiked={isLiked}
                  rating={rating}
                  reviewCount={reviewCount}
                  imageUrl={url}
                  handleCardClick={handleCardClick}
                />
              )
            )}
          </div>
        </section>
      )}
    </>
  );
}
