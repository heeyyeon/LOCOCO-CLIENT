import { CategoryValue } from 'types/category';

export const campaignKeys = {
  all: ['campaigns'] as const,
  lists: (locale: string) => [...campaignKeys.all, 'list', locale] as const,

  byCategory: (category: CategoryValue, section: string, locale: string) =>
    [...campaignKeys.lists(locale), 'category', { category, section }] as const,

  byCategoryPaginated: (
    category: CategoryValue,
    section: string,
    locale: string
  ) =>
    [
      ...campaignKeys.lists(locale),
      'category',
      'paginated',
      { category, section },
    ] as const,
};
