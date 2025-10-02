import dayjs from 'dayjs';

export const getChipVariantByDate = (dueDate: string) => {
  const targetDate = dayjs(dueDate);

  const today = dayjs();

  return targetDate.isBefore(today, 'day') ? 'disabled' : 'default';
};

export const formatBracketDate = (
  dateString: string,
  isUpcoming?: boolean
): string => {
  const date = dayjs(dateString);
  return isUpcoming ? `${date.format('MM/DD')}~` : `~${date.format('MM/DD')}`;
};
