import {
  EYE_MAKEUP,
  FACE_MAKEUP,
  FACIAL_CARE,
  LIP_MAKEUP,
} from 'constants/category';

export const CATEGORY_OPTIONS = {
  FACIAL_CARE: FACIAL_CARE.options,
  FACE_MAKEUP: FACE_MAKEUP.options,
  EYE_MAKEUP: EYE_MAKEUP.options,
  LIP_MAKEUP: LIP_MAKEUP.options,
} as const;

export const CATEGORY_NAME = {
  FACIAL_CARE: FACIAL_CARE.name,
  FACE_MAKEUP: FACE_MAKEUP.name,
  EYE_MAKEUP: EYE_MAKEUP.name,
  LIP_MAKEUP: LIP_MAKEUP.name,
} as const;
