/**
 * 숫자를 3자리마다 콤마가 포함된 문자열로 변환 (일본어 로케일)
 * @param num - 변환할 숫자
 * @returns 콤마가 포함된 문자열
 */
export const formatJPY = (num: number = 0): string => {
  return num.toLocaleString('ja-JP');
};
