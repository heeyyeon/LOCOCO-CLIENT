import ProductDetailMainCarousel from './product-detail-main-carousel';
import ProductInfo from './product-info';
import ProductInfoTab from './product-info-tab';

interface ProductDetailSectionProps {
  productId: number;
  imageUrls: string[];
  productName: string;
  brandName: string;
  unit: string;
  reviewCount: number;
  rating: number;
  isLiked: boolean;
  productOptions: string[];
  normalPrice: number;
  productDetail: string;
  ingredients: string;
  oliveYoungUrl: string | null;
  q10Url: string | null;
  middleCategory: string;
  subCategory: string;
}

export default function ProductDetailSection({
  imageUrls,
  productDetail,
  ingredients,
  productId,
  productName,
  brandName,
  unit,
  reviewCount,
  rating,
  isLiked,
  productOptions,
  normalPrice,
  oliveYoungUrl,
  q10Url,
  middleCategory,
  subCategory,
}: ProductDetailSectionProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-[8.4rem] overflow-x-auto pb-[6rem] pt-[3.2rem]">
        <ProductDetailMainCarousel imageUrlList={imageUrls} />
        <ProductInfo
          productId={productId}
          productName={productName}
          brandName={brandName}
          unit={unit}
          reviewCount={reviewCount}
          rating={rating}
          isLiked={isLiked}
          productOptions={productOptions}
          normalPrice={normalPrice}
          oliveYoungUrl={oliveYoungUrl}
          q10Url={q10Url}
          middleCategory={middleCategory}
          subCategory={subCategory}
        />
      </div>
      <ProductInfoTab productDetail={productDetail} ingredients={ingredients} />
    </div>
  );
}
