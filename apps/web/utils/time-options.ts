export const timeOptions = () => {
  const AM_PM = [
    { label: 'AM', value: 'AM' },
    { label: 'PM', value: 'PM' },
  ];

  const HOURS = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return {
      label: hour.toString(),
      value: hour.toString(),
    };
  });

  const MINUTES = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i.toString().padStart(2, '0'),
  }));
  return { AM_PM, HOURS, MINUTES };
};
