import mongoose from 'mongoose';
import { HabitModel } from './models/habitModel';

const seeds = [
  {
    habitName: 'Reading',
    habitStatement: 'read for 15 minutes',
    habitTag: 'Personal development',
    habitColor: '#FF8B57',
    targetDaysDefault: [1, 2, 4, 5],
    habitDays: [
      { date: new Date('2025-01-14'), target: true, completed: false },
      { date: new Date('2025-01-15'), target: true, completed: true },
      { date: new Date('2025-01-17'), target: true, completed: true },
      { date: new Date('2025-01-19'), target: true, completed: false },
      { date: new Date('2025-01-20'), target: true, completed: true },
      { date: new Date('2025-01-21'), target: true, completed: true },
      { date: new Date('2025-01-23'), target: true, completed: false },
      { date: new Date('2025-01-25'), target: true, completed: false },
      { date: new Date('2025-01-27'), target: true, completed: false },
      { date: new Date('2025-01-29'), target: true, completed: true },
      { date: new Date('2025-01-31'), target: true, completed: false },
      { date: new Date('2025-02-02'), target: true, completed: false },
    ],
  },
  {
    habitName: 'Morning Jogging',
    habitStatement: 'jog for 15 minutes',
    habitTag: 'Physical health',
    targetDaysDefault: [1, 3, 6],
    habitColor: '#9BB1FF',
    habitDays: [
      { date: new Date('2025-01-14'), target: true, completed: false },
      { date: new Date('2025-01-16'), target: true, completed: true },
      { date: new Date('2025-01-19'), target: true, completed: false },
      { date: new Date('2025-01-21'), target: true, completed: true },
      { date: new Date('2025-01-23'), target: true, completed: true },
      { date: new Date('2025-01-26'), target: true, completed: false },
      { date: new Date('2025-01-27'), target: true, completed: false },
      { date: new Date('2025-01-31'), target: true, completed: false },
      { date: new Date('2025-02-01'), target: true, completed: false },
    ],
  },
];

const seedDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/flexihabit');
  await HabitModel.deleteMany({});
  await HabitModel.insertMany(seeds);
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
