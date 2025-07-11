import { CategoryNameEng, CategoryOptionEng } from 'types/category';
import { getAllCategoryMetadata } from 'utils/category';
import { useMemo, useState } from 'react';

export function useHeaderAction() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryNameEng | null>(null);
  const [selectedOption, setSelectedOption] =
    useState<CategoryOptionEng | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const categories = useMemo(() => getAllCategoryMetadata(), []);

  const handleSelectCategory = (category: CategoryNameEng) => {
    setSelectedCategory(category);
    setSelectedOption(null);
    setIsSearching(false);
  };

  const handleSelectOption = (option: CategoryOptionEng) => {
    setSelectedOption(option);
  };

  const handleOpenSearchBar = () => {
    setIsSearching((prev) => !prev);
    setSelectedCategory(null);
    setSelectedOption(null);
  };

  const handleChangeSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const activeMenu = useMemo(
    () => categories.find((category) => category.key === selectedCategory),
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
    handleChangeSearchValue,
  };
}
