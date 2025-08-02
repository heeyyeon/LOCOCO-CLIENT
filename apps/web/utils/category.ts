import { CATEGORY_NAME, CATEGORY_OPTIONS } from 'constants/category';
import type {
  CategoryName,
  CategoryNameEng,
  CategoryOption,
  CategoryOptionEng,
} from 'types/category';

/** CategoryNameEng 타입인지 확인하는 타입 가드 */
function isCategoryKey(key: string): key is CategoryNameEng {
  return key in CATEGORY_OPTIONS;
}

/** CategoryOptionEng 타입인지 확인하는 타입 가드 */
function isCategoryOptionKey(
  key: string,
  category: CategoryNameEng
): key is CategoryOptionEng {
  return key in CATEGORY_OPTIONS[category];
}

/**
 * URL 파라미터가 유효한 CategoryNameEng인지 확인하는 타입 가드
 * @param value - 검증할 문자열 값
 * @returns 유효한 CategoryNameEng이면 true, 아니면 false
 */
export function isValidCategoryKey(value: string): value is CategoryNameEng {
  return value !== '' && isCategoryKey(value);
}

/**
 * URL 파라미터가 유효한 CategoryOptionEng인지 확인하는 타입 가드
 * @param value - 검증할 문자열 값
 * @param categoryKey - 해당 카테고리 키
 * @returns 유효한 CategoryOptionEng이면 true, 아니면 false
 */
export function isValidCategoryOption(
  value: string,
  categoryKey: CategoryNameEng
): value is CategoryOptionEng {
  return value !== '' && isCategoryOptionKey(value, categoryKey);
}

/**
 * 카테고리 옵션의 일본어 라벨을 반환하는 유틸
 * @param categoryKey - 카테고리 키 (예: 'FACIAL_CARE')
 * @param optionKey - 옵션 키 (예: 'TONER')
 * @returns 해당 옵션의 일본어 라벨 (예: 'トナー')
 */
export function getOptionLabel(
  categoryKey: CategoryNameEng,
  optionKey: CategoryOptionEng
): CategoryOption {
  const options = CATEGORY_OPTIONS[categoryKey] as Record<
    CategoryOptionEng,
    CategoryOption
  >;

  return options[optionKey];
}

/**
 * 카테고리 메타데이터 인터페이스
 * 헤더의 카테고리 바와 옵션 바에서 사용
 */
export interface CategoryMetadata {
  key: CategoryNameEng;
  name: CategoryName;
  options: CategoryOptionEng[];
}

/**
 * 모든 카테고리의 메타데이터를 반환하는 유틸
 * 헤더의 카테고리 바 렌더링에 사용
 * @returns CategoryMetadata[] - 모든 카테고리의 키, 이름, 옵션 정보
 */
export function getAllCategoryMetadata(): CategoryMetadata[] {
  return Object.keys(CATEGORY_OPTIONS)
    .filter(isCategoryKey)
    .map((categoryKey) => {
      const options = Object.keys(CATEGORY_OPTIONS[categoryKey]).filter(
        (optionKey): optionKey is CategoryOptionEng =>
          isCategoryOptionKey(optionKey, categoryKey)
      );

      return {
        key: categoryKey,
        name: CATEGORY_NAME[categoryKey],
        options,
      };
    });
}
