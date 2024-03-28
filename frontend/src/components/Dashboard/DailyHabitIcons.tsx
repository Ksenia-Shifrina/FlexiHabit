import React, { useState, useMemo, useEffect } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export interface DailyHabitIconsProps {
  id: string;
  targetDays: Date[];
  targetDaysDefault: number[];
  completedDays: Date[];
  weekDates: Date[];
  markDayAsCompleted: Function;
  unmarkDayAsCompleted: Function;
  updateTargetDays: Function;
}

const DailyHabitIcons: React.FC<DailyHabitIconsProps> = ({
  id,
  targetDays,
  targetDaysDefault,
  completedDays,
  weekDates,
  markDayAsCompleted,
  unmarkDayAsCompleted,
  updateTargetDays,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOrigin, setDragOrigin] = useState<string | null>(null);
  const today = new Date();
  const oneWeekFromToday = new Date();
  oneWeekFromToday.setDate(today.getDate() - 7);

  const handleTickedIcon = (dateToDelete: Date) => {
    unmarkDayAsCompleted(dateToDelete, id);
  };

  const handleUntickedIcon = (dateToAdd: Date) => {
    markDayAsCompleted(dateToAdd, id);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    setDragOrigin(id);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>, dateToAdd: Date) => {
    event.preventDefault();
    if (dragOrigin !== id) {
      return;
    }

    if (draggedIndex !== null && !containsDate(targetDays, dateToAdd)) {
      updateTargetDays(weekDates[draggedIndex], dateToAdd, id);
    }

    setDragOrigin(null);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDragOrigin(null);
    setDraggedIndex(null);
  };

  const containsDate = (dates: Date[], dateToCheck: Date): boolean => {
    return dates.some((date) => {
      const parsedDate = new Date(date);
      const parsedDateToCheck = new Date(dateToCheck);
      return (
        parsedDate.getFullYear() === parsedDateToCheck.getFullYear() &&
        parsedDate.getMonth() === parsedDateToCheck.getMonth() &&
        parsedDate.getDate() === parsedDateToCheck.getDate()
      );
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      {weekDates.map((date, index) => {
        if (date.getTime() < oneWeekFromToday.getTime() && containsDate(completedDays, date)) {
          return (
            <IconButton
              key={index}
              onDrop={(event) => handleDrop(event, date)}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}
            >
              <CheckRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
            </IconButton>
          );
        } else if (weekDates[0].getTime() > today.getTime() && targetDaysDefault.includes(index)) {
          return (
            <IconButton key={index} sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}>
              <AdjustRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
            </IconButton>
          );
        } else if (date.getTime() > today.getTime() && containsDate(targetDays, date)) {
          return (
            <IconButton
              key={index}
              draggable={true}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}
            >
              <AdjustRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
            </IconButton>
          );
        } else if (date.getTime() < oneWeekFromToday.getTime() && containsDate(targetDays, date)) {
          return (
            <IconButton
              key={index}
              draggable={true}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}
            >
              <AdjustRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
            </IconButton>
          );
        } else if (date.getTime() > today.getTime() || date.getTime() < oneWeekFromToday.getTime()) {
          return (
            <IconButton
              key={index}
              onDrop={(event) => handleDrop(event, date)}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}
            >
              <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
            </IconButton>
          );
        } else if (containsDate(completedDays, date)) {
          return (
            <IconButton
              key={index}
              onClick={() => handleTickedIcon(date)}
              onDrop={(event) => handleDrop(event, date)}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.dark', fontSize: 'large', p: '0', mx: 'auto' }}
            >
              <CheckRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
            </IconButton>
          );
        } else if (containsDate(targetDays, date)) {
          return (
            <IconButton
              key={index}
              onClick={() => handleUntickedIcon(date)}
              draggable={true}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.dark', fontSize: 'large', p: '0', mx: 'auto' }}
            >
              <AdjustRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
            </IconButton>
          );
        } else {
          return (
            <IconButton
              key={index}
              onClick={() => handleUntickedIcon(date)}
              onDrop={(event) => handleDrop(event, date)}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.dark', fontSize: 'large', p: '0', mx: 'auto' }}
            >
              <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
            </IconButton>
          );
        }
      })}
    </Box>
  );
};

export default DailyHabitIcons;
