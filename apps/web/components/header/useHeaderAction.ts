import { CATEGORY_OPTIONS, CATEGORY_NAME } from 'constants/category';
import { CategoryName, CategoryOption } from 'types/category';
import { useMemo, useState } from 'react';

export function useHeaderAction() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<CategoryOption | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const categories = useMemo(
    () =>
      Object.entries(CATEGORY_OPTIONS).map(([key, option]) => ({
        category: CATEGORY_NAME[key as keyof typeof CATEGORY_NAME],
        options: Object.values(option) as CategoryOption[],
      })),
    []
  );

  const handleSelectCategory = (title: CategoryName) => {
    setSelectedCategory(title);
    setSelectedOption(null);
    setIsSearching(false);
  };

  const handleSelectOption = (option: CategoryOption) => {
    setSelectedOption(option);
  };

  const handleOpenSearchBar = () => {
    setIsSearching((prev) => !prev);
    setSelectedCategory(null);
    setSelectedOption(null);
  };

  const handleChangeSearch = (text: string) => {
    setSearchValue(text);
  };

  const activeMenu = useMemo(
    () => categories.find((cat) => cat.category === selectedCategory),
    [categories, selectedCategory]
  );

  return {
    categories,
    selectedCategory,
    selectedOption,
    isSearching,
    searchValue,
    activeMenu,
    handleSelectCategory,
    handleSelectOption,
    handleOpenSearchBar,
    handleChangeSearch,
  };
}
