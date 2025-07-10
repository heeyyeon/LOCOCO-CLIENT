import { useState } from 'react';
import { TabContainer, Tab } from '@/components';

interface ProductInfoTabProps {
  productDetail: string;
  ingredients: string;
}

export default function ProductInfoTab({
  productDetail,
  ingredients,
}: ProductInfoTabProps) {
  const [activeTab, setActiveTab] = useState<'productDetail' | 'ingredients'>(
    'productDetail'
  );

  return (
    <div className="w-full">
      <TabContainer className="w-full">
        <Tab
          label="123"
          variant={'secondary'}
          className="w-full"
          onClick={() => setActiveTab('productDetail')}
          active={activeTab === 'productDetail'}
        >
          製品の特徴
        </Tab>
        <Tab
          label="234"
          variant={'secondary'}
          className="w-full"
          onClick={() => setActiveTab('ingredients')}
          active={activeTab === 'ingredients'}
        >
          原材料・成分
        </Tab>
      </TabContainer>
      {activeTab === 'productDetail' && (
        <div className="text-jp-body1 py-[4rem] text-gray-700">
          {productDetail}
        </div>
      )}
      {activeTab === 'ingredients' && (
        <div className="text-jp-body1 py-[4rem] text-gray-700">
          {ingredients}
        </div>
      )}
    </div>
  );
}
