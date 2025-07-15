'use client';

import CardProduct from 'components/card/card-product';
import { useRouter } from 'next/navigation';
import { ProductItem } from '../../../api/product-response';
import NotFoundSection from './not-found-section';

export default function SearchProductsSection({
  products,
}: {
  products: ProductItem[];
}) {
  const router = useRouter();
  const handleCardClick = (productId: number) => {
    router.push(`/product-detail/${productId}`);
  };

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
