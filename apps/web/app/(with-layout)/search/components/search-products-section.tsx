import CardProduct from 'components/card/card-product';
import { ProductItem } from 'types/product';

export default function SearchProductsSection({
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
        {products.map((product) => (
          <CardProduct
            key={product.productId}
            brandName={product.brandName}
            productName={product.productName}
            unit={product.unit}
            productId={product.productId}
            isLiked={product.isLiked}
            rating={product.rating}
            reviewCount={product.reviewCount}
            imageUrl={product.imageUrl}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </section>
  );
}
