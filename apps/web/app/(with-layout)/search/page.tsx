'use client';

import {
  mockImageReviewSearchResponse,
  mockProductSearchResponse,
  mockVideoReviewSearchResponse,
} from 'app/search/mockup';
import { SEARCH_OPTION } from 'constants/option';
import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { SearchOption } from 'types/option';
import { isValidCategoryKey, isValidCategoryOption } from 'utils/category';
import { Suspense, useMemo, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

  const selectedTab: SearchOption = useMemo(() => {
    if (rawSearchType === 'REVIEW') return SEARCH_OPTION.REVIEW;
    return SEARCH_OPTION.PRODUCT;
  }, [rawSearchType]);

  const productData = mockProductSearchResponse;
  const reviewVideoData = mockVideoReviewSearchResponse;
  const reviewImageData = mockImageReviewSearchResponse;

  const handleClickTab = (option: SearchOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (option === SEARCH_OPTION.REVIEW) {
      params.set('searchType', 'REVIEW');
    } else {
      params.set('searchType', 'PRODUCT');
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleVideoButton = () => {};
  const handleImageButton = () => {};

  const tabRender = {
    [SEARCH_OPTION.PRODUCT]: (
      <SearchProductsSection products={productData.products} />
    ),
    [SEARCH_OPTION.REVIEW]: (
      <SearchReviewSection
        reviewsVideo={reviewVideoData.reviews}
        reviewsImage={reviewImageData.reviews}
        handleVideoButton={handleVideoButton}
        handleImageButton={handleImageButton}
      />
    ),
  }[selectedTab];

  if (!isClient) {
    return <div>Loading...</div>;
  }

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
