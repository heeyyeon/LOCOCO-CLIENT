'use client';

import { SEARCH_OPTION } from 'constants/option';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { SearchOption } from 'types/option';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';
import { Suspense, useMemo, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  useProductSearch,
  useReviewVideoSearch,
  useReviewImageSearch,
  useCategoryProductSearch,
  useCategoryReviewVideoSearch,
  useCategoryReviewImageSearch,
} from '../../../hooks/use-product-api';
import OptionSelector from './components/option-selector';
import SearchBreadCrumbSection from './components/search-bread-crumb-section';
import SearchProductsSection from './components/search-products-section';
import SearchReviewSection from './components/search-reviews-section';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const rawMiddle = searchParams.get('middleCategory') || '';
  const rawSub = searchParams.get('subCategory') || '';
  const rawSearchType = searchParams.get('searchType') || '';

  const middleCategory: CategoryNameEng | '' = isValidCategoryKey(rawMiddle)
    ? rawMiddle
    : '';
  const subCategory: CategoryOptionEng | '' =
    middleCategory && isValidCategoryOption(rawSub, middleCategory)
      ? rawSub
      : '';
<<<<<<< HEAD
  const keyword = searchParams.get('keyword') || '';
=======

  const keyword = searchParams.get('keyword') || '';

>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
  const selectedTab: SearchOption = useMemo(() => {
    if (rawSearchType === 'REVIEW') return SEARCH_OPTION.REVIEW;
    return SEARCH_OPTION.PRODUCT;
  }, [rawSearchType]);

  // 검색바로 검색한 경우
<<<<<<< HEAD
  const {
    data: productSearchData,
    isLoading: isProductSearchLoading,
    isError: isProductSearchError,
  } = useProductSearch(
=======
  const productSearchQuery = useProductSearch(
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
    keyword,
    0,
    8,
    !!keyword && selectedTab === SEARCH_OPTION.PRODUCT
  );
<<<<<<< HEAD

  const {
    data: reviewVideoSearchData,
    isLoading: isReviewVideoSearchLoading,
    isError: isReviewVideoSearchError,
  } = useReviewVideoSearch(
=======
  const reviewVideoSearchQuery = useReviewVideoSearch(
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
    keyword,
    0,
    8,
    !!keyword && selectedTab === SEARCH_OPTION.REVIEW
  );
<<<<<<< HEAD

  const {
    data: reviewImageSearchData,
    isLoading: isReviewImageSearchLoading,
    isError: isReviewImageSearchError,
  } = useReviewImageSearch(
=======
  const reviewImageSearchQuery = useReviewImageSearch(
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
    keyword,
    0,
    8,
    !!keyword && selectedTab === SEARCH_OPTION.REVIEW
  );

  // 카테고리로 검색한 경우
<<<<<<< HEAD
  const {
    data: categoryProductData,
    isLoading: isCategoryProductLoading,
    isError: isCategoryProductError,
  } = useCategoryProductSearch(
=======
  const categoryProductQuery = useCategoryProductSearch(
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
    middleCategory,
    subCategory,
    0,
    8,
    !!middleCategory && selectedTab === SEARCH_OPTION.PRODUCT
  );
<<<<<<< HEAD

  const {
    data: categoryReviewVideoData,
    isLoading: isCategoryReviewVideoLoading,
    isError: isCategoryReviewVideoError,
  } = useCategoryReviewVideoSearch(
=======
  const categoryReviewVideoQuery = useCategoryReviewVideoSearch(
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
    middleCategory,
    subCategory,
    0,
    8,
    !!middleCategory && selectedTab === SEARCH_OPTION.REVIEW
  );
<<<<<<< HEAD

  const {
    data: categoryReviewImageData,
    isLoading: isCategoryReviewImageLoading,
    isError: isCategoryReviewImageError,
  } = useCategoryReviewImageSearch(
=======
  const categoryReviewImageQuery = useCategoryReviewImageSearch(
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
    middleCategory,
    subCategory,
    0,
    8,
    !!middleCategory && selectedTab === SEARCH_OPTION.REVIEW
  );

  const productData = keyword
<<<<<<< HEAD
    ? productSearchData?.data
    : categoryProductData?.data;
  const reviewVideoData = keyword
    ? reviewVideoSearchData?.data
    : categoryReviewVideoData?.data;
  const reviewImageData = keyword
    ? reviewImageSearchData?.data
    : categoryReviewImageData?.data;

  const isLoading =
    (keyword &&
      (isProductSearchLoading ||
        isReviewVideoSearchLoading ||
        isReviewImageSearchLoading)) ||
    (!keyword &&
      (isCategoryProductLoading ||
        isCategoryReviewVideoLoading ||
        isCategoryReviewImageLoading));

  const hasError =
    (keyword &&
      (isProductSearchError ||
        isReviewVideoSearchError ||
        isReviewImageSearchError)) ||
    (!keyword &&
      (isCategoryProductError ||
        isCategoryReviewVideoError ||
        isCategoryReviewImageError));
=======
    ? productSearchQuery.data?.data
    : categoryProductQuery.data?.data;
  const reviewVideoData = keyword
    ? reviewVideoSearchQuery.data?.data
    : categoryReviewVideoQuery.data?.data;
  const reviewImageData = keyword
    ? reviewImageSearchQuery.data?.data
    : categoryReviewImageQuery.data?.data;

  const isLoading =
    (keyword &&
      (productSearchQuery.isLoading ||
        reviewVideoSearchQuery.isLoading ||
        reviewImageSearchQuery.isLoading)) ||
    (!keyword &&
      (categoryProductQuery.isLoading ||
        categoryReviewVideoQuery.isLoading ||
        categoryReviewImageQuery.isLoading));
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9

  const handleClickTab = (option: SearchOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (option === SEARCH_OPTION.REVIEW) {
      params.set('searchType', 'REVIEW');
    } else {
      params.set('searchType', 'PRODUCT');
    }

    router.push(`/search?${params.toString()}`);
  };

  const tabRender = {
    [SEARCH_OPTION.PRODUCT]: (
      <SearchProductsSection products={(productData as any)?.products || []} />
    ),
    [SEARCH_OPTION.REVIEW]: (
      <SearchReviewSection
        reviewsVideo={(reviewVideoData as any)?.reviews || []}
        reviewsImage={(reviewImageData as any)?.reviews || []}
<<<<<<< HEAD
=======
        handleVideoButton={handleVideoButton}
        handleImageButton={handleImageButton}
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
      />
    ),
  }[selectedTab];

  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>데이터를 불러오는 중...</div>;
  }

<<<<<<< HEAD
  if (hasError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

=======
>>>>>>> f5dd48a448c113142320359834c38a8796bcc8f9
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex flex-col items-start self-stretch"></div>
      <SearchBreadCrumbSection
        middleCategory={middleCategory}
        subCategory={subCategory}
      />
      <OptionSelector
        selectedTab={selectedTab}
        handleClickTab={handleClickTab}
      />
      {tabRender}
    </div>
  );
}
