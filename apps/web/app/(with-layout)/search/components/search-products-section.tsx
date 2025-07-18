'use client';

import CardProduct from 'components/card/card-product';
import CardSkeletonWrapper from 'components/card/card-skeleton';
import { useProductSearch, useCategoryProductSearch } from 'hooks/headers-api';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import NotFoundSection from './not-found-section';

export default function SearchProductsSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const keyword = searchParams.get('keyword') || '';
  const rawMiddle = searchParams.get('middleCategory') || '';
  const rawSub = searchParams.get('subCategory') || '';

  const middleCategory: CategoryNameEng | '' = isValidCategoryKey(rawMiddle)
    ? rawMiddle
    : '';
  const subCategory: CategoryOptionEng | '' =
    middleCategory && isValidCategoryOption(rawSub, middleCategory)
      ? rawSub
      : '';

  const PAGE_SIZE = 8;
  const PAGE_NUMBER = 0;

  // 검색바로 검색한 경우
  const {
    data: productSearchData,
    isLoading: isProductSearchLoading,
    isError: isProductSearchError,
  } = useProductSearch(keyword, PAGE_NUMBER, PAGE_SIZE, !!keyword);

  // 카테고리로 검색한 경우
  const {
    data: categoryProductData,
    isLoading: isCategoryProductLoading,
    isError: isCategoryProductError,
  } = useCategoryProductSearch(
    middleCategory,
    subCategory,
    PAGE_NUMBER,
    PAGE_SIZE,
    !!middleCategory
  );

  const products = keyword
    ? productSearchData?.data?.products || []
    : categoryProductData?.data?.products || [];

  const isLoading = keyword ? isProductSearchLoading : isCategoryProductLoading;
  const hasError = keyword ? isProductSearchError : isCategoryProductError;

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
