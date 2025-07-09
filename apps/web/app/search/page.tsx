'use client';

import RenderProducts from 'components/search/renderProducts';
import RenderReviews from 'components/search/renderReviews';
import { TabButton, Tabs } from 'components/search/tab';
import { SEARCH_OPTION } from 'constants/option';
import { SearchOption } from 'types/option';
import { ProductItems } from 'types/product';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components';
import { SvgHomeFill } from '@/icons';
import {
  mockImageReviewSearchResponse,
  mockProductSearchResponse,
  mockVideoReviewSearchResponse,
} from './mockupData';

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<SearchOption>(
    SEARCH_OPTION.PRODUCT
  );
  const productData = mockProductSearchResponse;
  const reviewVideoData = mockVideoReviewSearchResponse;
  const reviewImageData = mockImageReviewSearchResponse;

  const handleClickTab = (option: SearchOption) => {
    setSelectedTab(option);
  };

  const TAB_RENDER = {
    [SEARCH_OPTION.PRODUCT]: <RenderProducts />,
    [SEARCH_OPTION.REVIEW]: <RenderReviews />,
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex flex-col items-start self-stretch"></div>
      <Breadcrumb className="flex h-[5.2rem] items-center self-stretch bg-gray-100 px-[11.9rem] opacity-80">
        <BreadcrumbList className="text-jp-body2 text-gray-600">
          <BreadcrumbItem className="flex aspect-square h-[4.4rem] w-[4.4rem] items-center justify-center p-[1rem]">
            <SvgHomeFill />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="flex h-[3.2rem] items-center justify-center gap-[1rem] px-[1.6rem] py-[1rem]">
            {productData.searchQuery}
          </BreadcrumbItem>

          {productData.parentCategoryName && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="flex h-[3.2rem] items-center justify-center gap-[1rem] px-[1.6rem] py-[1rem]">
                {productData.parentCategoryName}
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs
        selectedTab={selectedTab}
        productCount={productData.pageInfo.numberOfElements}
        reviewCount={
          reviewImageData.pageInfo.numberOfElements +
          reviewVideoData.pageInfo.numberOfElements
        }
        handleClickTab={handleClickTab}
      />
      {TAB_RENDER[selectedTab]}
    </div>
  );
}
