import { CATEGORY_NAME } from 'constants/tab-category';

export type CategoryKey = keyof typeof CATEGORY_NAME;

export type CategoryValue = (typeof CATEGORY_NAME)[keyof typeof CATEGORY_NAME];
