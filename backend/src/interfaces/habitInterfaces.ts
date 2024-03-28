import { Document, Schema } from 'mongoose';

export interface IHabit extends Document {
  id: Schema.Types.ObjectId;
  habitName: string;
  statement: string;
  tag: string;
  color: string;
  targetDaysDefault: number[];
  days: [Day];
}

export interface Day {
  date: Date;
  completed: boolean;
  target: boolean;
}

export interface HabitBasicData {
  id: string;
  streak: number;
  habitName: string;
  statement: string;
  tag: string;
  color: string;
  targetDaysDefault: number[];
}
