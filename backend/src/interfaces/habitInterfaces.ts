import { Document, Schema } from 'mongoose';

export interface IHabit extends Document {
  id: Schema.Types.ObjectId;
  habitName: string;
  habitColor: string;
  habitStatement: string;
  habitTag: string;
  targetDaysDefault: number[];
  habitDays: [HabitDay];
}

export interface HabitDay {
  date: Date;
  target: boolean;
  completed: boolean;
}

export interface HabitBasicData {
  id: string;
  streakCount: number;
  habitName: string;
  habitColor: string;
  habitStatement: string;
  habitTag: string;
  targetDaysDefault: number[];
}

export interface HabitEditData {
  id: string;
  habitName: string;
  habitColor: string;
  habitStatement: string;
  habitTag: string;
  targetDaysDefault: number[];
}

export interface ManageHabitRequest {
  habitName: string;
  habitColor: string;
  habitStatement: string;
  habitTag: string;
  targetDaysDefault: number[];
}
