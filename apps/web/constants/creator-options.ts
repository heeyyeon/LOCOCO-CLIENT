import { useTranslations } from 'next-intl';

const GENDER_VALUES = [
  'MALE',
  'FEMALE',
  'NON_BINARY',
  'PREFER_NOT_TO_SAY',
] as const;
const CONTENT_LANGUAGE_VALUES = [
  'ENGLISH',
  'SPANISH',
  'ENGLISH_AND_SPANISH',
] as const;
const SKIN_TYPE_VALUES = [
  'NORMAL',
  'DRY',
  'OILY',
  'COMBINATION',
  'SENSITIVE',
  'OTHERS',
] as const;
const SKIN_TONE_VALUES = [
  { value: 'SHADE_1', color: '#F1DDD2' },
  { value: 'SHADE_2', color: '#F4D6CB' },
  { value: 'SHADE_3', color: '#EBC9BA' },
  { value: 'SHADE_4', color: '#EDCBBC' },
  { value: 'SHADE_5', color: '#E5C9B3' },
  { value: 'SHADE_6', color: '#E8C8AF' },
  { value: 'SHADE_7', color: '#D5B5A0' },
  { value: 'SHADE_8', color: '#D3A186' },
  { value: 'SHADE_9', color: '#CB9C88' },
  { value: 'SHADE_10', color: '#C39480' },
  { value: 'SHADE_11', color: '#C8967B' },
  { value: 'SHADE_12', color: '#BE886E' },
  { value: 'SHADE_13', color: '#BE886E' },
  { value: 'SHADE_14', color: '#8D6955' },
  { value: 'SHADE_15', color: '#846354' },
  { value: 'SHADE_16', color: '#885543' },
  { value: 'SHADE_17', color: '#743D27' },
  { value: 'SHADE_18', color: '#4D2B21' },
  { value: 'SHADE_19', color: '#482D24' },
  { value: 'SHADE_20', color: '#37271F' },
] as const;

export function useGenderOptions() {
  const t = useTranslations('creatorOptions.gender');
  return GENDER_VALUES.map((value) => ({
    label: t(value),
    value,
  }));
}

export function useContentLanguageOptions() {
  const t = useTranslations('creatorOptions.contentLanguage');
  return CONTENT_LANGUAGE_VALUES.map((value) => ({
    label: t(value),
    value,
  }));
}

export function useSkinTypeOptions() {
  const t = useTranslations('creatorOptions.skinType');
  return SKIN_TYPE_VALUES.map((value) => ({
    label: t(value),
    value,
  }));
}

export function useSkinToneOptions() {
  const t = useTranslations('creatorOptions.skinTone');
  return SKIN_TONE_VALUES.map((item) => ({
    label: t(item.value),
    value: item.value,
    color: item.color,
  }));
}
