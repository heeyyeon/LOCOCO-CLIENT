import dayjs from 'dayjs';

export const getChipVariantByDate = (dueDate: string) => {
  const targetDate = dayjs(dueDate);

  const today = dayjs();

  return targetDate.isBefore(today, 'day') ? 'expired' : 'active';
};
