/**
 * 전화번호에 하이픈을 자동으로 추가하는 함수
 * @param value - 입력된 전화번호 문자열
 * @returns 하이픈이 추가된 전화번호
 */
export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/[^0-9]/g, '');

  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else if (numbers.length <= 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
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
 * @returns 유효한 전화번호인지 여부
 */
export const isValidPhoneNumber = (value: string): boolean => {
  const numbers = removePhoneNumberFormat(value);
  const phoneRegex = /^01[0-9][0-9]{3,4}[0-9]{4}$/;
  return phoneRegex.test(numbers) && numbers.length === 11;
};
