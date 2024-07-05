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

export interface EditHabitData {
  id: string;
  habitName: string;
  habitStatement: string;
  habitTag: string;
  targetDaysDefault: number[];
  habitColor: string;
}

// export interface HabitDays {
//   id: string;
//   targetDays: Date[];
//   completedDays: Date[];
// }
