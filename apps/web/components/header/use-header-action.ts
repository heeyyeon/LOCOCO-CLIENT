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
    setIsSearching(!isSearching);
    // SearchBar가 펴질 때 카테고리 선택 초기화
    if (!isSearching) {
      setSelectedCategory(null);
      setSelectedOption(null);
    }
  };

  const handleChangeSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const handleSearchIconClick = () => {
    // 검색 아이콘 클릭 시 검색 페이지로 이동 (Link 태그로 처리되므로 여기서는 로그만)
    if (searchValue.trim()) {
      console.log('검색 페이지로 이동:', searchValue);
      // 검색 후 검색바 닫기
      setIsSearching(false);
    }
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
    handleSearchIconClick,
  };
}
