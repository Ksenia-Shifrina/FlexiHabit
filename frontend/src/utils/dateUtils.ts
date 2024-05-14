export const daysOfWeekLong: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const daysOfWeekShort: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const isSameCalendarDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const containsDate = (dates: Date[], dateToCheck: Date): boolean => {
  return dates.some((date) => {
    const parsedDate = new Date(date);
    const parsedDateToCheck = new Date(dateToCheck);
    return (
      parsedDate.getFullYear() === parsedDateToCheck.getFullYear() &&
      parsedDate.getMonth() === parsedDateToCheck.getMonth() &&
      parsedDate.getDate() === parsedDateToCheck.getDate()
    );
  });
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
  const currentMonthIndex = currentMondayDate.getMonth();
  return { currentWeekDates, currentMonthIndex };
};

export const calculateNewWeekDates = (offset: number, prevMondayDate: Date) => {
  const newWeekDates: Date[] = [];
  const newMondayDate = new Date(prevMondayDate);
  newMondayDate.setDate(prevMondayDate.getDate() + offset);
  const newMonthIndex = newMondayDate.getMonth();
  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(newMondayDate);
    weekDay.setDate(newMondayDate.getDate() + i);
    newWeekDates.push(weekDay);
  }
  return { newWeekDates, newMonthIndex };
};
