import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {
  daysOfWeekShort,
  daysOfWeekLong,
  isSameCalendarDay,
  months,
  calculateNewWeekDates,
} from '../../utils/dateUtils';
import { useFetchNewWeekHabits } from '../../hooks/habitApiHooks';
import { Habit } from '../../types/habitTypes';

export interface CalendarProps {
  weekDates: Date[];
  setWeekDates: Function;
  displayMonthIndex: number;
  setDisplayMonthIndex: Function;
  setFetchedHabits: Function;
}

const Calendar: React.FC<CalendarProps> = ({
  weekDates,
  setWeekDates,
  displayMonthIndex,
  setDisplayMonthIndex,
  setFetchedHabits,
}) => {
  const today = new Date();

  const {
    habits: newWeekHabits,
    error: newWeekError,
    loading: newWeekLoading,
    fetchNewWeekHabits: fetchNewWeekHabits,
  } = useFetchNewWeekHabits();

  const getNewWeek = async (offset: number) => {
    const { newWeekDates, newMonthIndex } = calculateNewWeekDates(offset, weekDates[0]);
    setDisplayMonthIndex(newMonthIndex);
    setWeekDates(newWeekDates);
    fetchNewWeekHabits(newWeekDates[0], newWeekDates[6]);
  };

  React.useEffect(() => {
    if (newWeekHabits) {
      setFetchedHabits((prevHabits: Habit[]) =>
        prevHabits.map((habit) => {
          const updatedHabit = newWeekHabits.find((h: Habit) => h.id === habit.id);
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
    }
  }, [newWeekHabits]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        pl: { xs: 1.5, sm: 2 },
        pt: { xs: 0, sm: 1 },
        width: { xs: '93%', sm: '82%' },
        maxWidth: '550px',
        maxHeight: { xs: '95px', sm: '120px' },
        ml: { xs: 2, sm: 0 },
        mt: { xs: 3, sm: 4 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexBasis: { xs: '19%', sm: '21%' },
          flexShrink: 0,
          justifyContent: 'center',
          ml: -0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            ml: { xs: 0, sm: 0 },
          }}
        >
          {months[displayMonthIndex]}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexGrow: 1,
          flexDirection: 'row',
        }}
      >
        <IconButton onClick={() => getNewWeek(-7)} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
          <ChevronLeftRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
            flexDirection: 'row',
          }}
        >
          {weekDates.map((date, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  textAlign: 'center',
                  mx: 'auto',
                  fontWeight: isSameCalendarDay(date, today) ? 'bold' : 'normal',
                  color: date.getTime() > today.getTime() ? 'background.lightText' : 'background.contrastText',
                }}
              >
                {daysOfWeekLong[index]}
              </Typography>
              <Typography
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  textAlign: 'center',
                  mx: 'auto',
                  fontWeight: isSameCalendarDay(date, today) ? 'bold' : 'normal',
                  color: date.getTime() > today.getTime() ? 'background.lightText' : 'background.contrastText',
                }}
              >
                {daysOfWeekShort[index]}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  textAlign: 'center',
                  mx: 'auto',
                  fontWeight: isSameCalendarDay(date, today) ? 'bold' : 'normal',
                  color: date.getTime() > today.getTime() ? 'background.lightText' : 'background.contrastText',
                }}
              >
                {date.getDate()}
              </Typography>
            </Box>
          ))}
        </Box>

        <IconButton onClick={() => getNewWeek(7)} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
          <ChevronRightRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Calendar;
