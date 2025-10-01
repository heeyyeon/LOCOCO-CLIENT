import { useFormatter } from 'next-intl';

import dayjs from 'dayjs';

// TODO: 추후 다국어와 함께 사용할 수 있도록 포맷터 확장
/**
 * 날짜 범위를 포맷하는 함수
 * @param startDate 시작 날짜 (문자열)
 * @param endDate 종료 날짜 (문자열)
 * @param format next-intl의 format 객체
 * @returns 포맷된 날짜 범위 문자열
 */
export const koDateRangeFormatter = (
  startDate: string,
  endDate: string,
  format: ReturnType<typeof useFormatter>
): string => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  // 같은 년월인 경우: "2025년 8월 15–20일"
  if (start.year() === end.year() && start.month() === end.month()) {
    return `${start.year()}년 ${start.month() + 1}월 ${start.date()}–${end.date()}일`;
  }

  // 다른 년월인 경우: "2025년 8월 15일 - 2025년 9월 20일"
  return `${format.dateTime(start.toDate(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}-${format.dateTime(end.toDate(), {
    month: 'short',
    day: 'numeric',
  })}`;
};
