import CardProduct from 'components/card/card-product';
import { ProductItem } from 'types/product';

export default function RenderProducts({
  products,
}: {
  products: ProductItem[];
}) {
  const handleCardClick = (productId: number) => {
    console.log(`Card clicked: ${productId}`);
  };

  return (
    <section className="flex flex-col self-stretch p-[11.9rem] pb-[12rem] pt-[3.2rem]">
      <div className="mx-auto flex w-[112.8rem] flex-wrap content-center gap-[2.4rem]">
        {products.map(
          ({
            brandName,
            productName,
            unit,
            productId,
            isLiked,
            rating,
            reviewCount,
            imageUrl,
          }) => (
            <CardProduct
              key={productId}
              brandName={brandName}
              productName={productName}
              unit={unit}
              productId={productId}
              isLiked={isLiked}
              rating={rating}
              reviewCount={reviewCount}
              imageUrl={imageUrl}
              handleCardClick={handleCardClick}
            />
          )
        )}
      </div>
    </section>
  );
}
