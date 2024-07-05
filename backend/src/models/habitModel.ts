import mongoose, { Document, Schema } from 'mongoose';
import { IHabit } from '../interfaces/habitInterfaces';

const HabitSchema = new Schema<IHabit>({
  id: Schema.Types.ObjectId,
  habitName: String,
  habitColor: String,
  habitStatement: String,
  habitTag: String,
  targetDaysDefault: [Number],
  habitDays: [
    {
      date: Date,
      target: Boolean,
      completed: Boolean,
    },
  ],
});

export const HabitModel = mongoose.model<IHabit>('Habit', HabitSchema);
