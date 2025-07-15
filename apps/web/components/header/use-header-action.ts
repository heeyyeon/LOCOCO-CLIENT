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

  const handleMouseLeaveCategory = () => {
    setSelectedCategory(null);
    setSelectedOption(null);
  };

  const handleSelectOption = (option: CategoryOptionEng) => {
    setSelectedOption(option);
  };

  const handleOpenSearchBar = () => {
    setIsSearching(!isSearching);

    if (!isSearching) {
      setSelectedCategory(null);
      setSelectedOption(null);
    }
  };

  const handleChangeSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const handleSearchIconClick = () => {
    if (searchValue.trim()) {
      setIsSearching(false);
    }
  };

  const activeMenu = useMemo(
    () =>
      categories.find((category) => category.key === selectedCategory) || null,
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
    handleMouseLeaveCategory,
    handleSelectOption,
    handleOpenSearchBar,
    handleChangeSearchValue,
    handleSearchIconClick,
  };
}
