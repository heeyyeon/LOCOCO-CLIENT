/**
 * 전화번호에 하이픈을 자동으로 추가하는 함수
 * 국내번호(3-4-4)와 해외번호(3-3-4) 모두 지원
 * @param value - 입력된 전화번호 문자열
 * @param format - 'domestic' (3-4-4) 또는 'international' (3-3-4)
 * @returns 하이픈이 추가된 전화번호
 */
export const formatPhoneNumber = (
  value: string,
  format: 'domestic' | 'international' = 'domestic'
): string => {
  const numbers = value.replace(/[^0-9]/g, '');

  if (format === 'international') {
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  } else {
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  }
};

/**
 * 전화번호에서 하이픈을 제거하는 함수
 * @param value - 하이픈이 포함된 전화번호
 * @returns 숫자만 남은 전화번호
 */
export const removePhoneNumberFormat = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};

/**
 * 전화번호 유효성 검사
 * @param value - 검사할 전화번호
 * @param format - 'domestic' (11자리) 또는 'international' (10자리)
 * @returns 유효한 전화번호인지 여부
 */
export const isValidPhoneNumber = (
  value: string,
  format: 'domestic' | 'international' = 'domestic'
): boolean => {
  const numbers = removePhoneNumberFormat(value);

  if (format === 'international') {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(numbers) && numbers.length === 10;
  } else {
    const phoneRegex = /^01[0-9][0-9]{3,4}[0-9]{4}$/;
    return phoneRegex.test(numbers) && numbers.length === 11;
  }
};
