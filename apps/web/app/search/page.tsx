'use client';

import RenderProducts from 'components/search/renderProducts';
import RenderReviews from 'components/search/renderReviews';
import { TabButton } from 'components/search/tab';
import { useState } from 'react';

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
  const [selectedTab, setSelectedTab] = useState<TabKey>('product');

  return (
    <div className="flex w-full flex-col items-start">
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
