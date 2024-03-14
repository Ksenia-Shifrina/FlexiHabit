import React, { useState } from 'react';
import { Box, Container, IconButton } from '@mui/material';
import HabitBox, { HabitProps } from './HabitBox';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Calendar from './Calendar';

const HabitList: React.FC = () => {
  const listOfHabits = [
    {
      id: 1,
      habitName: 'Read',
      streakCount: 4,
      statement: 'read 10 pages',
      targetDays: [0],
      completedDays: [0],
      tag: ['Personal development '],
    },
    {
      id: 2,
      habitName: 'Drink water',
      streakCount: 3,
      statement: 'drink 5 glasses of water',
      targetDays: [0],
      completedDays: [0],
      tag: ['Health'],
    },
    {
      id: 3,
      habitName: 'Gym',
      streakCount: 3,
      statement: 'workout for 30 minutes',
      targetDays: [0, 2, 4, 5],
      completedDays: [0],
      tag: ['Health'],
    },
  ];

  const today = new Date();
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [displayMondayDate, setDisplayMondayDate] = useState<Date>(today);
  const [displayMonthIndex, setDisplayMonthIndex] = useState<number>(0);

  const getWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    let newWeekDates: Date[] = [];

    if (dayOfWeek === 0) {
      const offsetToMonday = 1 - dayOfWeek;
      const newMondayDate = new Date(currentYear, currentMonth, currentDay + offsetToMonday - 7);
      const newMonthIndex = newMondayDate.getMonth();
      for (let i = 0; i < 7; i++) {
        const weekDay = new Date(newMondayDate.getFullYear(), newMondayDate.getMonth(), newMondayDate.getDate() + i);
        newWeekDates.push(weekDay);
      }
      setDisplayMonthIndex(newMonthIndex);
      setDisplayMondayDate(newMondayDate);
      setWeekDates(newWeekDates);
    } else {
      const offsetToMonday = 1;
      const newMondayDate = new Date(currentYear, currentMonth, currentDay - (dayOfWeek - offsetToMonday));
      const newMonthIndex = newMondayDate.getMonth();
      for (let i = 0; i < 7; i++) {
        const weekDay = new Date(newMondayDate.getFullYear(), newMondayDate.getMonth(), newMondayDate.getDate() + i);
        newWeekDates.push(weekDay);
      }
      setDisplayMondayDate(newMondayDate);
      setDisplayMonthIndex(newMonthIndex);
      setWeekDates(newWeekDates);
    }
  };

  React.useEffect(function () {
    getWeekDates();
  }, []);

  const getNewWeekDates = (offset: number) => {
    let newWeekDates: Date[] = [];
    const newMondayDate = new Date(displayMondayDate);
    newMondayDate.setDate(displayMondayDate.getDate() + offset);
    const newMonthIndex = newMondayDate.getMonth();
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(newMondayDate);
      weekDay.setDate(newMondayDate.getDate() + i);
      newWeekDates.push(weekDay);
    }
    setDisplayMondayDate(newMondayDate);
    setDisplayMonthIndex(newMonthIndex);
    setWeekDates(newWeekDates);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 0,
      }}
    >
      <Calendar
        getNewWeekDates={getNewWeekDates}
        weekDates={weekDates}
        displayMonthIndex={displayMonthIndex}
        displayMondayDate={displayMondayDate}
      />
      {listOfHabits.map((habit) => (
        <HabitBox key={habit.id} habit={habit} weekDates={weekDates} displayMondayDate={displayMondayDate} />
      ))}
      <IconButton
        sx={{
          color: 'addButton.main',
          fontSize: 'large',
          p: '0',
          mt: { xs: 2, sm: 3 },
        }}
      >
        <AddCircleRoundedIcon sx={{ fontSize: { xs: '2.3rem', sm: '2.7rem' } }} />
      </IconButton>
    </Container>
  );
};

export default HabitList;
