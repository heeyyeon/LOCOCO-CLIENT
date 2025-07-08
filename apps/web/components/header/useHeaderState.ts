import { CATEGORY_OPTIONS, CATEGORY_NAME } from 'constants/category';
import { CategoryName, CategoryOption } from 'types/category';
import { useMemo, useState } from 'react';

export function useHeaderState() {
  const [activeTitle, setActiveTitle] = useState<CategoryName | null>(null);
  const [activeOption, setActiveOption] = useState<CategoryOption | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const menu = useMemo(
    () =>
      Object.entries(CATEGORY_OPTIONS).map(([key, option]) => ({
        title: CATEGORY_NAME[key as keyof typeof CATEGORY_NAME],
        options: Object.values(option) as CategoryOption[],
      })),
    []
  );

  const handleMenuToggle = (title: CategoryName) => {
    setActiveTitle(title);
    setActiveOption(null);
    setIsSearching(false);
  };

  const handleOptionClick = (option: CategoryOption) => {
    setActiveOption(option);
  };

  const handleSearchToggle = () => {
    setIsSearching((prev) => !prev);
    setActiveTitle(null);
    setActiveOption(null);
  };

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const activeMenu = useMemo(
    () => menu.find((menu) => menu.title === activeTitle),
    [menu, activeTitle]
  );

  return {
    menu,
    activeTitle,
    activeOption,
    isSearching,
    searchValue,
    activeMenu,
    handleMenuToggle,
    handleOptionClick,
    handleSearchToggle,
    handleSearchValue,
  };
}
