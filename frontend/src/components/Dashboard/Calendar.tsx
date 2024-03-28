import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const daysOfWeekFull: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const daysOfWeek: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export interface CalendarProps {
  weekDates: Date[];
  displayMonthIndex: number;
  getNewWeekDates: Function;
}

const Calendar: React.FC<CalendarProps> = ({ weekDates, getNewWeekDates, displayMonthIndex }) => {
  const today = new Date();

  const handlePrevWeek = () => {
    getNewWeekDates(-7);
  };

  const handleNextWeek = () => {
    getNewWeekDates(7);
  };

  const isSameCalendarDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

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
        <IconButton onClick={handlePrevWeek} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
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
                {daysOfWeekFull[index]}
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
                {daysOfWeek[index]}
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

        <IconButton onClick={handleNextWeek} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
          <ChevronRightRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Calendar;
