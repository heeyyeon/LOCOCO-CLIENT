'use client';

import RenderProducts from 'components/search/renderProducts';
import RenderReviews from 'components/search/renderReviews';
import { TabButton } from 'components/search/tab';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components';
import { SvgHomeFill } from '@/icons';

const TABS = {
  product: {
    label: '商品',
    render: () => <RenderProducts />,
  },
  review: {
    label: 'レビュー',
    render: () => <RenderReviews />,
  },
} as const;

type TabKey = keyof typeof TABS;

export default function Page() {
  const searchParams = useSearchParams();
  const middleCategory = searchParams?.get('middleCategory');
  const subCategory = searchParams?.get('subCategory');

  const [selectedTab, setSelectedTab] = useState<TabKey>('product');

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex flex-col items-start self-stretch"></div>
      {middleCategory && (
        <Breadcrumb className="flex h-[5.2rem] items-center self-stretch bg-gray-100 px-[11.9rem] opacity-80">
          <BreadcrumbList className="text-jp-body2 text-gray-600">
            <BreadcrumbItem className="flex aspect-square h-[4.4rem] w-[4.4rem] items-center justify-center p-[1rem]">
              <SvgHomeFill />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex h-[3.2rem] items-center justify-center gap-[1rem] px-[1.6rem] py-[1rem]">
              {middleCategory}
            </BreadcrumbItem>

            {subCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="flex h-[3.2rem] items-center justify-center gap-[1rem] px-[1.6rem] py-[1rem]">
                  {subCategory}
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <nav className="flex w-full items-center self-stretch px-[11.9rem]">
        {Object.entries(TABS).map(([key, { label }]) => (
          <TabButton
            key={key}
            label={label}
            count={0}
            isSelected={selectedTab === key}
            onClick={() => setSelectedTab(key as TabKey)}
          />
        ))}
      </nav>

      {selectedTab === 'product' ? TABS.product.render() : TABS.review.render()}
    </div>
  );
}
