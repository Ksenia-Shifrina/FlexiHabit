export const adjustDateForTimezone = (date: Date) => {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
};
