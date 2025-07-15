import { SEARCH_OPTION } from 'constants/option';

export type SearchOption = (typeof SEARCH_OPTION)[keyof typeof SEARCH_OPTION];
