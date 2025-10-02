import dayjs from 'dayjs';

export const getChipVariantByDate = (dueDate: string) => {
  const targetDate = dayjs(dueDate);

  const today = dayjs();

  return targetDate.isBefore(today, 'day') ? 'disabled' : 'default';
};

export const formatBracketDate = (
  dateString: string,
  isUpComing?: boolean
): string => {
  const date = dayjs(dateString);
  return isUpComing ? `${date.format('MM/DD')}~` : `~${date.format('MM/DD')}`;
};
