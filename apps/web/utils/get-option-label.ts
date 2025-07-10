import { CATEGORY_OPTIONS } from 'constants/category';
import type {
  CategoryKey,
  CategoryOptionEng,
  CategoryOption,
} from 'types/category';

export function getOptionLabel(
  categoryKey: CategoryKey,
  optionKey: CategoryOptionEng
): CategoryOption {
  const options = CATEGORY_OPTIONS[categoryKey] as Record<
    CategoryOptionEng,
    CategoryOption
  >;
  return options[optionKey];
}
