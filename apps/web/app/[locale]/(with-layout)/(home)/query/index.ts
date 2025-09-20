import { CategoryKey } from 'types/category';

export const campaignKeys = {
  all: ['campaigns'] as const,
  lists: (locale: string) => [...campaignKeys.all, 'list', locale] as const,

  byCategory: (category: CategoryKey, section: string, locale: string) =>
    [...campaignKeys.lists(locale), 'category', { category, section }] as const,

  byCategoryPaginated: (
    category: CategoryKey,
    section: string,
    locale: string,
    page: number,
    size: number
  ) =>
    [
      ...campaignKeys.lists(locale),
      'category',
      'paginated',
      { category, section, page, size },
    ] as const,
};
