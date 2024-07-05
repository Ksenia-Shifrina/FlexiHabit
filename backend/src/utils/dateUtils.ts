export const adjustDateForTimezone = (date: Date) => {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
};

export const calculateWeekDatesStartMonday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentWeekDates: Date[] = [];
  const currentMondayDate =
    dayOfWeek === 0
      ? new Date(currentYear, currentMonth, currentDate - 6)
      : new Date(currentYear, currentMonth, currentDate - dayOfWeek + 1);
  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(currentMondayDate);
    weekDay.setDate(currentMondayDate.getDate() + i);
    currentWeekDates.push(weekDay);
  }
  return currentWeekDates;
};
