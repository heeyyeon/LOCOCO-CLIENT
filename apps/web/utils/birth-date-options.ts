import dayjs from 'dayjs';

export const birthDateOptions = () => {
  const currentYear = dayjs().year();

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      label: `${month.toString().padStart(2, '0')}`,
      value: `${month}`,
    };
  });

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    return {
      label: `${day.toString().padStart(2, '0')}`,
      value: `${day}`,
    };
  });

  const years = Array.from({ length: 100 }, (_, i) => {
    const year = currentYear - i;
    return {
      label: `${dayjs().year(year).format('YYYY')}`,
      value: `${year}`,
    };
  });

  return { months, days, years };
};
