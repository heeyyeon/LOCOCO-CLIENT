export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= currentYear - 100; year--) {
    years.push({ label: year.toString() });
  }
  return years;
};

export const generateMonthOptions = () => {
  const months = [];
  for (let month = 1; month <= 12; month++) {
    months.push({ label: month.toString().padStart(2, '0') });
  }
  return months;
};

export const generateDateOptions = () => {
  const dates = [];
  for (let date = 1; date <= 31; date++) {
    dates.push({ label: date.toString().padStart(2, '0') });
  }
  return dates;
};
