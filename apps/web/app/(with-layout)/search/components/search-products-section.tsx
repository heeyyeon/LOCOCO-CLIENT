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
    <section className="mx-auto grid w-[1366px] grid-cols-4 gap-[2.4rem] px-[11.9rem] pb-[12rem] pt-[3.2rem]">
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
    </section>
  );
}
