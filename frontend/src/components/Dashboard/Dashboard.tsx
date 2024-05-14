import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import HabitBox from './HabitBox';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import { Habit } from '../../types/habitTypes';
import { useFetchHabits } from '../../hooks/habitApiHooks';
import { calculateWeekDatesStartMonday } from '../../utils/dateUtils';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [fetchedHabits, setFetchedHabits] = useState<Habit[]>([]);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [displayMonthIndex, setDisplayMonthIndex] = useState<number>(0);

  const { habits: Habits, error: Error, loading: Loading, fetchHabits: fetchHabits } = useFetchHabits();

  React.useEffect(() => {
    const { currentWeekDates, currentMonthIndex } = calculateWeekDatesStartMonday();
    setDisplayMonthIndex(currentMonthIndex);
    setWeekDates(currentWeekDates);
    fetchHabits(currentWeekDates[0], currentWeekDates[6]);
  }, []);

  React.useEffect(() => {
    if (Habits) {
      setFetchedHabits(Habits);
    }
  }, [Habits]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 0,
      }}
    >
      <Calendar
        setWeekDates={setWeekDates}
        weekDates={weekDates}
        setDisplayMonthIndex={setDisplayMonthIndex}
        displayMonthIndex={displayMonthIndex}
        setFetchedHabits={setFetchedHabits}
      />
      {fetchedHabits.length > 0 &&
        fetchedHabits.map((habit) => (
          <HabitBox key={habit.id} habit={habit} weekDates={weekDates} setFetchedHabits={setFetchedHabits} />
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
        onClick={() => navigate('/flexihabit/newhabit')}
      >
        <AddCircleRoundedIcon sx={{ fontSize: { xs: '2.3rem', sm: '2.7rem' } }} />
      </IconButton>
    </Box>
  );
};

export default Dashboard;
