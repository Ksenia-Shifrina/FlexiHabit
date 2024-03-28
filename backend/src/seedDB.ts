import mongoose from 'mongoose';
import { HabitModel } from './models/habitModel';

const seeds = [
  {
    habitName: 'Daily Reading',
    statement: 'read a book for at least 5 minutes',
    tag: 'Self-development',
    color: '#FF8B57',
    targetDaysDefault: [1, 2, 4, 5],
    days: [
      { date: new Date('2024-03-01'), target: true, completed: false },
      { date: new Date('2024-03-03'), target: true, completed: true },
      { date: new Date('2024-03-05'), target: false, completed: true },
      { date: new Date('2024-03-07'), target: true, completed: true },
      { date: new Date('2024-03-09'), target: false, completed: true },
      { date: new Date('2024-03-11'), target: true, completed: false },
      { date: new Date('2024-03-13'), target: false, completed: true },
      { date: new Date('2024-03-15'), target: true, completed: false },
      { date: new Date('2024-03-17'), target: true, completed: true },
      { date: new Date('2024-03-18'), target: false, completed: true },
      { date: new Date('2024-03-19'), target: true, completed: false },
      { date: new Date('2024-03-21'), target: true, completed: false },
      { date: new Date('2024-03-23'), target: true, completed: false },
      { date: new Date('2024-03-25'), target: false, completed: true },
      { date: new Date('2024-03-26'), target: true, completed: false },
      { date: new Date('2024-03-28'), target: true, completed: false },
      { date: new Date('2024-03-29'), target: true, completed: false },
    ],
  },
  {
    habitName: 'Morning Jogging',
    statement: 'jog for at least 10 minutes',
    tag: 'Health',
    targetDaysDefault: [1, 3, 5],
    color: '#9BB1FF',
    days: [
      { date: new Date('2024-03-02'), target: true, completed: true },
      { date: new Date('2024-03-04'), target: false, completed: true },
      { date: new Date('2024-03-06'), target: true, completed: false },
      { date: new Date('2024-03-08'), target: false, completed: true },
      { date: new Date('2024-03-10'), target: true, completed: true },
      { date: new Date('2024-03-12'), target: true, completed: false },
      { date: new Date('2024-03-14'), target: true, completed: true },
      { date: new Date('2024-03-16'), target: false, completed: true },
      { date: new Date('2024-03-18'), target: true, completed: true },
      { date: new Date('2024-03-20'), target: false, completed: true },
      { date: new Date('2024-03-22'), target: true, completed: false },
      { date: new Date('2024-03-24'), target: true, completed: false },
      { date: new Date('2024-03-26'), target: true, completed: true },
      { date: new Date('2024-03-27'), target: false, completed: true },
      { date: new Date('2024-03-29'), target: true, completed: false },
      { date: new Date('2024-03-31'), target: true, completed: false },
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
