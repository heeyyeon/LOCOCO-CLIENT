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
