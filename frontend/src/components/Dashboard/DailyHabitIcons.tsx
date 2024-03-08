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
  id: number,
  goalDays: number[],
  completedDays: number[]
}

const DailyHabitIcons: React.FC<DailyHabitIconsProps> = ({ id, goalDays, completedDays }) => {
  const [checkedIcons, setCheckedIcons] = useState(completedDays);
  const [goalIcons, setGoalIcons] = useState(goalDays);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOrigin, setDragOrigin] = useState<number | null>(null);

  const getDayStartingMonday = () => {
    const date = new Date();
    let day = date.getDay();
    day = day === 0 ? 6 : day - 1;
    return day;
  }

  const currentDayOfWeek = getDayStartingMonday();

  const handleCheckedIcon = (index: number) => {
    setCheckedIcons(prev => prev.filter(item => item !== index))
  }

  const handleGoalIcon = (index: number) => {
    setCheckedIcons(prev => [...prev, index]);
  }

  const handleSimpleIcon = (index: number) => {
    setCheckedIcons(prev => [...prev, index]);
  }

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>, index: number) => {
    setDraggedIndex(index);
    setDragOrigin(id);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>, targetIndex: number) => {
    event.preventDefault();
    if (dragOrigin !== id) {
      return;
    }
    if (draggedIndex !== null) {
      setGoalIcons((prev) => {
        const filteredIcons = prev.filter(item => item !== draggedIndex);
        filteredIcons.splice(0, 0, targetIndex);
        return filteredIcons;
      });
    }
    setDragOrigin(null);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDragOrigin(null);
    setDraggedIndex(null);
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      mb: { xs: 1.5, sm: 3}, 
      width: '100%'
    }}> 
      {Array.from({ length: 7 }).map((_, index) => {
        if (index > currentDayOfWeek && goalIcons.includes(index)) {
          return (
          <IconButton 
            key={index}
            draggable={true} 
            onDragStart={(event) => handleDragStart(event, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(event) => event.preventDefault()}
            sx={{ color: 'icons.light', fontSize: 'large', p: '0'}}>
            <AdjustRoundedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
          </IconButton>)
        } else if (index > currentDayOfWeek) {
          return (
          <IconButton 
            key={index} 
            onDrop={(event) => handleDrop(event, index)}
            onDragOver={(event) => event.preventDefault()}
            sx={{ color: 'icons.light', fontSize: 'large', p: '0'}}>
            <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
          </IconButton>)
        } else if (checkedIcons.includes(index)) {
          return (
            <IconButton 
              key={index} 
              onClick={() => handleCheckedIcon(index)} 
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.dark', fontSize: 'large', p: '0'}}>
              <CheckRoundedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
            </IconButton>)
        } else if (goalIcons.includes(index)) {
          return (
            <IconButton 
              key={index} 
              onClick={() => handleGoalIcon(index)} 
              draggable={true} 
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.dark', fontSize: 'large', p: '0'}}>
              <AdjustRoundedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
            </IconButton>)
        } else {
          return (
            <IconButton 
              key={index} 
              onClick={() => handleSimpleIcon(index)} 
              onDrop={(event) => handleDrop(event, index)}
              onDragOver={(event) => event.preventDefault()}
              sx={{ color: 'icons.dark', fontSize: 'large', p: '0'}}>
              <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }} />
            </IconButton>)
        }
      })}
    </Box>  
  )
}

export default DailyHabitIcons;
