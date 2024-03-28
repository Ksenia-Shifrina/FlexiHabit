import mongoose, { Document, Schema } from 'mongoose';
import { IHabit } from '../interfaces/habitInterfaces';

const HabitSchema = new Schema<IHabit>({
  id: Schema.Types.ObjectId,
  habitName: String,
  statement: String,
  tag: String,
  color: String,
  targetDaysDefault: [Number],
  days: [
    {
      date: Date,
      target: Boolean,
      completed: Boolean,
    },
  ],
});

export const HabitModel = mongoose.model<IHabit>('Habit', HabitSchema);
