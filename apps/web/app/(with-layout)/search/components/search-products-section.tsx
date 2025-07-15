'use client';

import CardProduct from 'components/card/card-product';
import { ProductItem } from '../../../api/product-response';
import NotFoundSection from './not-found-section';

export default function SearchProductsSection({
  products,
}: {
  products: ProductItem[];
}) {
  const handleCardClick = (productId: number) => {
    console.log(`Card clicked: ${productId}`);
  };

  return (
    <section className="flex flex-col p-[11.9rem] pb-[12rem] pt-[3.2rem]">
      {products.length === 0 ? (
        <NotFoundSection variant="product" />
      ) : (
        <div className="mx-auto flex w-[112.8rem] flex-wrap content-center gap-[2.4rem]">
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
      )}
    </section>
  );
}
