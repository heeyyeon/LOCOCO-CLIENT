'use client';

import { SEARCH_OPTION } from 'constants/option';
import { SearchOption } from 'types/option';
import { Button } from '@/components';

type TabButtonProps = {
  label: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
};

export const TabButton = ({
  label,
  count,
  isSelected,
  onClick,
}: TabButtonProps) => {
  const baseStyle = 'font-bold text-gray-800 border-b-2 bg-white';
  const selectedStyle = 'text-en-title2 border-gray-800';
  const unselectedStyle = 'text-jp-title2 border-gray-300';

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${isSelected ? selectedStyle : unselectedStyle}`}
    >
      <p className="whitespace-nowrap">{label}</p>
      <p>({count})</p>
    </button>
  );
};
interface TabsProps {
  selectedTab: (typeof SEARCH_OPTION)[keyof typeof SEARCH_OPTION];
  productCount: number;
  reviewCount: number;
  handleClickTab: (option: SearchOption) => void;
}
export const Tabs = ({
  selectedTab,
  productCount,
  reviewCount,
  handleClickTab,
}: TabsProps) => {
  const baseStyle =
    'w-full flex h-[6rem] px-[2rem] py-[1rem] justify-center items-center font-bold border-b-2 bg-white';
  const selectedStyle = 'text-en-title2 border-gray-800';
  const unselectedStyle = 'text-jp-title2 border-gray-300';

  return (
    <div className="flex w-full items-center self-stretch px-[11.9rem]">
      {Object.values(SEARCH_OPTION).map((value) => {
        const isSelected = selectedTab === value;
        const className = `${baseStyle} ${isSelected ? selectedStyle : unselectedStyle}`;
        const count =
          value === SEARCH_OPTION.PRODUCT ? productCount : reviewCount;

        return (
          <Button
            key={value}
            color="secondary"
            variant="outline"
            size="lg"
            onClick={() => handleClickTab(value)}
            className={className}
          >
            <p>{value}</p>
            <p>({count})</p>
          </Button>
        );
      })}
    </div>
  );
};
