import { CATEGORY_OPTIONS, CATEGORY_NAME } from 'constants/category';
import { CategoryKey, CategoryName, CategoryOptionEng } from 'types/category';
import { useMemo, useState } from 'react';
import useCustomSearchParams from './use-custom-search-params';

export function useHeaderAction() {
  const { setSearchParams, resetSearchParams } = useCustomSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(
    null
  );
  const [selectedOption, setSelectedOption] =
    useState<CategoryOptionEng | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const categories = useMemo(() => {
    return (Object.keys(CATEGORY_OPTIONS) as CategoryKey[]).map((key) => ({
      key,
      name: CATEGORY_NAME[key],
      options: Object.keys(CATEGORY_OPTIONS[key]) as CategoryOptionEng[],
    }));
  }, []);

  const handleSelectCategory = (key: CategoryKey) => {
    setSelectedCategory(CATEGORY_NAME[key]);
    setSelectedOption(null);
    setIsSearching(false);
    resetSearchParams();

    setSearchParams({ midCategory: key });
  };

  const handleSelectOption = (option: CategoryOptionEng) => {
    setSelectedOption(option);

    setSearchParams({ subCategory: option });
  };

  const handleOpenSearchBar = () => {
    setIsSearching((prev) => !prev);
    setSelectedCategory(null);
    setSelectedOption(null);

    resetSearchParams();
  };

  const handleChangeSearch = (text: string) => {
    setSearchValue(text);
  };

  const activeMenu = useMemo(
    () => categories.find((category) => category.name === selectedCategory),
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
