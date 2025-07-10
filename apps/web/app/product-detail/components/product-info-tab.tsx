import { useState } from 'react';
import { TabContainer, Tab } from '@lococo/design-system';

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
          label="製品の特徴"
          variant={'secondary'}
          className="w-full"
          onClick={() => setActiveTab('productDetail')}
          active={activeTab === 'productDetail'}
        ></Tab>
        <Tab
          label="原材料・成分"
          variant={'secondary'}
          className="w-full"
          onClick={() => setActiveTab('ingredients')}
          active={activeTab === 'ingredients'}
        ></Tab>
      </TabContainer>
      {activeTab === 'productDetail' && (
        <div className="text-jp-body1 border-b-[0.1rem] border-gray-300 py-[4rem] text-gray-700">
          {productDetail}
        </div>
      )}
      {activeTab === 'ingredients' && (
        <div className="text-jp-body1 border-b-[0.1rem] border-gray-300 py-[4rem] text-gray-700">
          {ingredients}
        </div>
      )}
    </div>
  );
}
