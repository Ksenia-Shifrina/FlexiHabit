export interface Habit {
  id: string;
  habitName: string;
  statement: string;
  tag: string;
  targetDaysDefault: number[];
  targetDays: Date[];
  completedDays: Date[];
  streak: number;
  color: string;
}

// export interface HabitDays {
//   id: string;
//   targetDays: Date[];
//   completedDays: Date[];
// }
