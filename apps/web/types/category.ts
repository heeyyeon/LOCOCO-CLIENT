import { CATEGORY_OPTIONS, CATEGORY_NAME } from 'constants/category';

export type CategoryKey = keyof typeof CATEGORY_OPTIONS;

export type CategoryName = (typeof CATEGORY_NAME)[CategoryKey];

export type CategoryOption =
  (typeof CATEGORY_OPTIONS)[CategoryKey][keyof (typeof CATEGORY_OPTIONS)[CategoryKey]];
