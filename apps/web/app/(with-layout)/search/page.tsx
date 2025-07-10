'use client';

import {
  mockImageReviewSearchResponse,
  mockProductSearchResponse,
  mockVideoReviewSearchResponse,
} from 'app/search/mockup';
import { SEARCH_OPTION } from 'constants/option';
import { CategoryKey, CategoryOptionEng } from 'types/category';
import { SearchOption } from 'types/option';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import OptionSelector from './components/option-selector';
import RenderBreadCrumb from './components/search-bread-crumb-section';
import RenderProducts from './components/search-products-section';
import RenderReviews from './components/search-reviews-section';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const rawMiddle = searchParams.get('middleCategory') || '';
  const rawSub = searchParams.get('subCategory') || '';

  const middleCategory = rawMiddle as CategoryKey | '';
  const subCategory = rawSub as CategoryOptionEng | '';
  const [selectedTab, setSelectedTab] = useState<SearchOption>(
    SEARCH_OPTION.PRODUCT
  );

  const productData = mockProductSearchResponse;
  const reviewVideoData = mockVideoReviewSearchResponse;
  const reviewImageData = mockImageReviewSearchResponse;

  const handleClickTab = (option: SearchOption) => {
    setSelectedTab(option);
  };
  const handleVideoButton = () => {};
  const handleImageButton = () => {};

  const tabRender = {
    [SEARCH_OPTION.PRODUCT]: <RenderProducts products={productData.products} />,
    [SEARCH_OPTION.REVIEW]: (
      <RenderReviews
        reviewsVideo={reviewVideoData.reviews}
        reviewsImage={reviewImageData.reviews}
        handleVideoButton={handleVideoButton}
        handleImageButton={handleImageButton}
      />
    ),
  }[selectedTab];

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex flex-col items-start self-stretch"></div>
      <RenderBreadCrumb
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
