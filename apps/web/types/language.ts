import { LANGUAGES } from 'constants/language';

export type LanguageKey = keyof typeof LANGUAGES;

export type LanguageValue = (typeof LANGUAGES)[keyof typeof LANGUAGES];
