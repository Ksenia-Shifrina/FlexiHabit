import { containsDate } from '../utils/dateUtils';

const today = new Date();
const oneWeekFromToday = new Date();
oneWeekFromToday.setDate(today.getDate() - 7);

export const isPastChecked = (date: Date, completedDays: Date[]) => {
  return date.getTime() < oneWeekFromToday.getTime() && containsDate(completedDays, date);
};

export const isFutureDefaultTarget = (index: number, weekDates: Date[], targetDaysDefault: number[]) => {
  return weekDates[0].getTime() > today.getTime() && targetDaysDefault.includes(index);
};

export const isPastOrFutureTarget = (date: Date, targetDays: Date[]) => {
  return (
    containsDate(targetDays, date) && (date.getTime() > today.getTime() || date.getTime() < oneWeekFromToday.getTime())
  );
};

export const isPastOrFutureUnchecked = (date: Date) => {
  return date.getTime() > today.getTime() || date.getTime() < oneWeekFromToday.getTime();
};

export const isCurrentChecked = (date: Date, completedDays: Date[]) => {
  return containsDate(completedDays, date);
};

export const isCurrentTarget = (date: Date, targetDays: Date[]) => {
  return containsDate(targetDays, date);
};
