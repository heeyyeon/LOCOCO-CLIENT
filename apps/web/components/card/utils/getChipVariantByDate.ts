import dayjs from 'dayjs';

export const getChipVariantByDate = (dueDate: string) => {
  const targetDate = dayjs(dueDate);

  const today = dayjs();

  return targetDate.isBefore(today, 'day') ? 'expired' : 'active';
};

export const formatBracketDate = (dateString: string): string => {
  const date = dayjs(dateString);
  return `~${date.format('MM/DD')}`;
};
