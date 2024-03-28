import React, { useState } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import HabitBox, { HabitProps } from './HabitBox';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Calendar from './Calendar';

interface Habit {
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

interface HabitDays {
  id: string;
  targetDays: Date[];
  completedDays: Date[];
}

const HabitList: React.FC = () => {
  const today = new Date();
  const [fetchedHabits, setFetchedHabits] = useState<Habit[]>([]);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [displayMondayDate, setDisplayMondayDate] = useState<Date>(today);
  const [displaySundayDate, setDisplaySundayDate] = useState<Date>(today);
  const [displayMonthIndex, setDisplayMonthIndex] = useState<number>(0);

  const getWeekDatesStartMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const newWeekDates: Date[] = [];
    const newMondayDate =
      dayOfWeek === 0
        ? new Date(currentYear, currentMonth, currentDate - 6)
        : new Date(currentYear, currentMonth, currentDate - dayOfWeek + 1);
    const newSundayDate = new Date();
    newSundayDate.setDate(newMondayDate.getDate() + 6);
    const newMonthIndex = newMondayDate.getMonth();
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(newMondayDate);
      weekDay.setDate(newMondayDate.getDate() + i);
      newWeekDates.push(weekDay);
    }
    setDisplayMonthIndex(newMonthIndex);
    setDisplayMondayDate(newMondayDate);
    setDisplaySundayDate(newSundayDate);
    setWeekDates(newWeekDates);
    fetchHabits(newMondayDate, newSundayDate);
  };

  const fetchHabits = async (startDate: Date, endDate: Date) => {
    const baseUrl = 'http://localhost:3001/flexihabit/dashboard';
    const queryParams = new URLSearchParams({
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    });
    const url = `${baseUrl}?${queryParams.toString()}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedData = await response.json();
      setFetchedHabits(fetchedData.habits);
    } catch (error) {
      console.error('Error fetching new week habits:', error);
    }
  };

  const getNewWeekDates = (offset: number) => {
    const newWeekDates: Date[] = [];
    const newMondayDate = new Date(displayMondayDate);
    const newSundayDate = new Date(displaySundayDate);
    newMondayDate.setDate(displayMondayDate.getDate() + offset);
    newSundayDate.setDate(displaySundayDate.getDate() + offset);
    const newMonthIndex = newMondayDate.getMonth();
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(newMondayDate);
      weekDay.setDate(newMondayDate.getDate() + i);
      newWeekDates.push(weekDay);
    }
    setDisplayMondayDate(newMondayDate);
    setDisplaySundayDate(newSundayDate);
    setDisplayMonthIndex(newMonthIndex);
    setWeekDates(newWeekDates);
    fetchNewWeekHabits(newMondayDate, newSundayDate);
  };

  const fetchNewWeekHabits = async (startDate: Date, endDate: Date) => {
    const baseUrl = 'http://localhost:3001/flexihabit/weekly-data';
    const queryParams = new URLSearchParams({
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    });
    const url = `${baseUrl}?${queryParams.toString()}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedData = await response.json();
      setFetchedHabits((prevHabits: Habit[]) =>
        prevHabits.map((habit) => {
          const updatedHabit: HabitDays = fetchedData.habits.find((h: Habit) => h.id === habit.id);
          return updatedHabit
            ? {
                ...habit,
                targetDays: updatedHabit.targetDays,
                completedDays: updatedHabit.completedDays,
              }
            : {
                ...habit,
                targetDays: [],
                completedDays: [],
              };
        })
      );
    } catch (error) {
      console.error('Error fetching new week habits:', error);
    }
  };

  React.useEffect(() => {
    getWeekDatesStartMonday();
  }, []);

  const markDayAsCompleted = async (completedDate: Date, habitId: string) => {
    const baseUrl = 'http://localhost:3001/flexihabit';
    const url = `${baseUrl}/${habitId}/mark-completed`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: completedDate,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      fetchHabits(displayMondayDate, displaySundayDate);
    } catch (error) {
      console.error('Error ticking date:', error);
    }
  };

  const unmarkDayAsCompleted = async (cancelledDate: Date, habitId: string) => {
    const baseUrl = 'http://localhost:3001/flexihabit';
    const url = `${baseUrl}/${habitId}/mark-uncompleted`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: cancelledDate,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      fetchHabits(displayMondayDate, displaySundayDate);
    } catch (error) {
      console.error('Error ticking date:', error);
    }
  };

  const updateTargetDays = async (dateToDelete: Date, dateToAdd: Date, habitId: string) => {
    const baseUrl = 'http://localhost:3001/flexihabit';
    const url = `${baseUrl}/${habitId}/target-dates`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateToDelete,
          dateToAdd,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      fetchHabits(displayMondayDate, displaySundayDate);
    } catch (error) {
      console.error('Error ticking date:', error);
    }
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
      <Calendar getNewWeekDates={getNewWeekDates} weekDates={weekDates} displayMonthIndex={displayMonthIndex} />
      {fetchedHabits.length > 0 &&
        fetchedHabits.map((habit) => (
          <HabitBox
            key={habit.id}
            habit={habit}
            weekDates={weekDates}
            markDayAsCompleted={markDayAsCompleted}
            unmarkDayAsCompleted={unmarkDayAsCompleted}
            updateTargetDays={updateTargetDays}
          />
        ))}
      {fetchedHabits.length === 0 && (
        <Typography
          variant="h6"
          sx={{
            mt: 10,
            mb: 5,
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.2rem' },
            color: 'primary.contrastText',
          }}
        >
          No habits yet
        </Typography>
      )}
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
