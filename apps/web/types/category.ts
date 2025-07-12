import { CATEGORY_OPTIONS, CATEGORY_NAME } from 'constants/category';

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
