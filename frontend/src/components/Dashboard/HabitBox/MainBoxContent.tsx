import React from 'react';
import BoltIcon from '@mui/icons-material/Bolt';
import { Box, Chip, Typography } from '@mui/material';
import DailyHabitIcons from './DailyHabitIcons/DailyHabitIcons';

export interface MainBoxContentProps {
  habitName: string;
  tag: string;
  targetDays: Date[];
  completedDays: Date[];
  streak: number;
  targetDaysDefault: number[];
  targetDaysDefaultCount: number;
  id: string;
  weekDates: Date[];
  setFetchedHabits: Function;
}

const MainBoxContent: React.FC<MainBoxContentProps> = ({
  habitName,
  tag,
  targetDays,
  completedDays,
  streak,
  targetDaysDefault,
  targetDaysDefaultCount,
  id,
  weekDates,
  setFetchedHabits,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: { xs: 0.7, sm: 1 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexBasis: { xs: '25%', sm: '27%' },
            flexShrink: 0,
            ml: -0.5,
          }}
        >
          <BoltIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.7rem' }, color: 'primary.contrastText' }} />
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: 'primary.contrastText' }}>
            {streak ? streak : 0}
          </Typography>
        </Box>
        <DailyHabitIcons
          id={id}
          targetDays={targetDays}
          targetDaysDefault={targetDaysDefault}
          completedDays={completedDays}
          weekDates={weekDates}
          setFetchedHabits={setFetchedHabits}
        />
      </Box>

      <Typography
        variant="h6"
        sx={{ textAlign: 'left', fontSize: { xs: '1rem', sm: '1.2rem' }, color: 'primary.contrastText' }}
      >
        {habitName}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body2" sx={{ textAlign: 'left', fontSize: { sm: '1rem' }, color: 'primary.contrastText' }}>
          {completedDays.length < targetDays.length
            ? `${completedDays.length} out of ${targetDays.length}`
            : targetDays.length === 0
              ? `0 out of ${targetDaysDefaultCount}`
              : 'Goal reached!'}
        </Typography>
        <Chip
          label={tag}
          size="small"
          sx={{
            height: { xs: '1.5em', sm: '1.8em' },
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            bgcolor: 'tags.main',
            color: 'tags.contrastText',
            borderRadius: '15px',
          }}
        />
      </Box>
    </Box>
  );
};

export default MainBoxContent;
