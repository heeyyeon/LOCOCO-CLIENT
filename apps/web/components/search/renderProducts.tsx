import CardProduct from 'components/card/card-products';
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
    <section className="flex w-[136.6rem] flex-col items-start self-stretch px-[11.9rem] pb-[12rem] pt-[3.2rem]">
      <div className="flex h-[123.6rem] flex-wrap content-center items-center gap-[2.4rem] self-stretch">
        {products.map(
          ({
            ranking,
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
