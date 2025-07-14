'use client';

import ProductDetailSection from './components/product-detail-section';
import Review from './components/review';
import StarRating from './components/star-rating';
import YoutubeCarousel from './components/youtube-carousel';
import { ProductDetailData } from './types';

interface ClientPageProps {
  productData: ProductDetailData;
}

export default function ClientPage({ productData }: ClientPageProps) {
  return (
    <div className="flex-col lg:flex lg:justify-center">
      <div className="flex w-[133.6rem] items-center">
        <div className="flex w-full flex-col gap-[10rem] px-[11.9rem]">
          {productData && (
            <ProductDetailSection
              imageUrls={productData.imageUrls}
              productDetail={productData.productDetail}
              ingredients={productData.ingredients}
              productId={Number(productData.productId)}
              productName={productData.productName}
              brandName={productData.brandName}
              unit={productData.unit}
              reviewCount={productData.reviewCount}
              rating={productData.rating}
              isLiked={productData.isLiked}
              productOptions={productData.productOptions}
              normalPrice={productData.normalPrice}
              oliveYoungUrl={productData.oliveYoungUrl}
              q10Url={productData.q10Url}
            />
          )}

          <YoutubeCarousel />
          <StarRating />
          <Review />
        </div>
      </div>
    </div>
  );
}
