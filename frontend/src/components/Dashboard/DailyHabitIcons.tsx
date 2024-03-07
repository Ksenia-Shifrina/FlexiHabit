import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  IconButton,
  styled,
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export interface DailyHabitIconsProps {
  id: number;
  goalDays: number[],
  completedDays: number[],
}

const DailyHabitIcons: React.FC<DailyHabitIconsProps> = ({ id, goalDays, completedDays }) => {
  const date = new Date();
  const currentDayOfWeek = date.getDay();
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      mb: { xs: 1.5, sm: 3}, 
      width: '100%'
    }}> 
      {Array.from({ length: 7 }).map((_, index) => {
        if (index > currentDayOfWeek && goalDays.includes(index)) {
          return (
          <IconButton key={index} sx={{ color: 'icons.light', fontSize: 'large', p: '0'}}>
            <AdjustRoundedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
          </IconButton>)
        } else if (index > currentDayOfWeek) {
          return (
          <IconButton key={index} sx={{ color: 'icons.light', fontSize: 'large', p: '0'}}>
            <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
          </IconButton>)
        } else if (completedDays.includes(index)) {
          return <IconButton key={index} sx={{ color: 'icons.dark', fontSize: 'large', p: '0'}}>
            <CheckRoundedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
            </IconButton>;
        } else if (goalDays.includes(index)) {
          return <IconButton key={index} sx={{ color: 'icons.dark', fontSize: 'large', p: '0'}}>
            <AdjustRoundedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
            </IconButton>;
        } else {
          return <IconButton key={index} sx={{ color: 'icons.dark', fontSize: 'large', p: '0'}}>
            <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
            </IconButton>;
        }
      })}
    </Box>  
  )
}

export default DailyHabitIcons;
