import {
  CATEGORY_NAME,
  CATEGORY_NAME_NEW,
  CATEGORY_OPTIONS,
} from 'constants/category';

export type CategoryNameEng = keyof typeof CATEGORY_OPTIONS;

export type CategoryName = (typeof CATEGORY_NAME)[CategoryNameEng];

export type CategoryOption =
  | (typeof CATEGORY_OPTIONS)['FACIAL_CARE'][keyof (typeof CATEGORY_OPTIONS)['FACIAL_CARE']]
  | (typeof CATEGORY_OPTIONS)['FACE_MAKEUP'][keyof (typeof CATEGORY_OPTIONS)['FACE_MAKEUP']]
  | (typeof CATEGORY_OPTIONS)['EYE_MAKEUP'][keyof (typeof CATEGORY_OPTIONS)['EYE_MAKEUP']]
  | (typeof CATEGORY_OPTIONS)['LIP_MAKEUP'][keyof (typeof CATEGORY_OPTIONS)['LIP_MAKEUP']];

export type CategoryOptionEng =
  | keyof (typeof CATEGORY_OPTIONS)['FACIAL_CARE']
  | keyof (typeof CATEGORY_OPTIONS)['FACE_MAKEUP']
  | keyof (typeof CATEGORY_OPTIONS)['EYE_MAKEUP']
  | keyof (typeof CATEGORY_OPTIONS)['LIP_MAKEUP'];

export type CategoryValue =
  (typeof CATEGORY_NAME_NEW)[keyof typeof CATEGORY_NAME_NEW];

export const CATEGORY_KEYS = Object.keys(
  CATEGORY_NAME_NEW
) as (keyof typeof CATEGORY_NAME_NEW)[];

export const CATEGORY_VALUES = Object.values(CATEGORY_NAME_NEW);
