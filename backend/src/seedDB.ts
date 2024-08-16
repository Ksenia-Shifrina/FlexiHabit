import mongoose from 'mongoose';
import { HabitModel } from './models/habitModel';

const seeds = [
  {
    habitName: 'Daily Reading',
    habitStatement: 'read 10 pages',
    habitTag: 'Personal development',
    habitColor: '#FF8B57',
    targetDaysDefault: [1, 2, 4, 5],
    habitDays: [
      { date: new Date('2024-06-09'), target: false, completed: true },
      { date: new Date('2024-06-11'), target: true, completed: false },
      { date: new Date('2024-06-13'), target: false, completed: true },
      { date: new Date('2024-06-15'), target: true, completed: false },
      { date: new Date('2024-06-17'), target: true, completed: true },
      { date: new Date('2024-06-18'), target: false, completed: true },
      { date: new Date('2024-06-19'), target: true, completed: false },
      { date: new Date('2024-06-21'), target: true, completed: false },
      { date: new Date('2024-06-23'), target: true, completed: false },
      { date: new Date('2024-06-25'), target: false, completed: true },
      { date: new Date('2024-06-26'), target: true, completed: false },
      { date: new Date('2024-06-28'), target: true, completed: false },
      { date: new Date('2024-06-29'), target: true, completed: false },
      { date: new Date('2024-08-01'), target: false, completed: true },
      { date: new Date('2024-08-02'), target: true, completed: true },
      { date: new Date('2024-08-03'), target: true, completed: false },
      { date: new Date('2024-08-05'), target: true, completed: true },
      { date: new Date('2024-08-07'), target: true, completed: true },
      { date: new Date('2024-08-09'), target: true, completed: false },
      { date: new Date('2024-08-10'), target: true, completed: false },
      { date: new Date('2024-08-14'), target: true, completed: false },
      { date: new Date('2024-08-16'), target: true, completed: true },
      { date: new Date('2024-08-17'), target: true, completed: false },
      { date: new Date('2024-08-18'), target: true, completed: false },
    ],
  },
  {
    habitName: 'Morning Jogging',
    habitStatement: 'jog for 15 minutes',
    habitTag: 'Physical health',
    targetDaysDefault: [1, 3, 5],
    habitColor: '#9BB1FF',
    habitDays: [
      { date: new Date('2024-06-10'), target: true, completed: true },
      { date: new Date('2024-06-12'), target: true, completed: false },
      { date: new Date('2024-06-14'), target: true, completed: true },
      { date: new Date('2024-06-16'), target: false, completed: true },
      { date: new Date('2024-06-18'), target: true, completed: true },
      { date: new Date('2024-06-20'), target: false, completed: true },
      { date: new Date('2024-06-22'), target: true, completed: false },
      { date: new Date('2024-06-24'), target: true, completed: false },
      { date: new Date('2024-06-26'), target: true, completed: true },
      { date: new Date('2024-06-27'), target: false, completed: true },
      { date: new Date('2024-06-29'), target: true, completed: false },
      { date: new Date('2024-06-31'), target: true, completed: false },
      { date: new Date('2024-08-01'), target: false, completed: true },
      { date: new Date('2024-08-02'), target: true, completed: false },
      { date: new Date('2024-08-03'), target: true, completed: false },
      { date: new Date('2024-08-04'), target: true, completed: false },
      { date: new Date('2024-08-05'), target: true, completed: true },
      { date: new Date('2024-08-09'), target: true, completed: false },
      { date: new Date('2024-08-10'), target: true, completed: false },
      { date: new Date('2024-08-14'), target: true, completed: true },
      { date: new Date('2024-08-16'), target: true, completed: false },
      { date: new Date('2024-08-17'), target: true, completed: false },
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
