import React from 'react';
import { Box, Typography, IconButton, Badge, Tooltip, Chip, Container } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import DailyHabitIcons from './DailyHabitIcons';

export interface HabitProps {
  habit: {
    id: number;
    habitName: string;
    streakCount: number;
    statement: string;
    targetDays: number[];
    completedDays: number[];
    tag: string[];
  };
  weekDates: Date[];
  displayMondayDate: Date;
}

const HabitBox: React.FC<HabitProps> = ({ habit, weekDates, displayMondayDate }) => {
  const id = habit.id;
  const habitName = habit.habitName;
  const streakCount = habit.streakCount;
  const statement = habit.statement;
  const targetDays = habit.targetDays;
  const completedDays = habit.completedDays;
  const tag = habit.tag;
  const targetDaysCount = targetDays.length;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        p: { xs: 1.5, sm: 2 },
        bgcolor: 'primary.main',
        borderRadius: '10px',
        boxShadow: 1,
        width: { xs: '90%', sm: '80%' },
        maxWidth: '550px',
        maxHeight: { xs: '95px', sm: '120px' },
        ml: { xs: 2, sm: 0 },
        mt: { xs: 6.5, sm: 8 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: { xs: -55, sm: -65 },
          left: -40,
          width: '100%',
          height: '100%',
          bgcolor: 'secondary.main',
          borderRadius: '10px',
          boxShadow: 1,
          zIndex: -1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          pl: { xs: 1.5, sm: 3 },
          pt: { xs: 1, sm: 1.5 },
          m: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{ textAlign: 'left', color: 'secondary.contrastText', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          {targetDaysCount === 7 && `I will ${statement} every day.`}
          {targetDaysCount === 1 && `I will ${statement} 1 time a week.`}
          {targetDaysCount > 1 && targetDaysCount < 7 && `I will ${statement} ${targetDaysCount} times a week.`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
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
            <BoltIcon
              sx={{ color: 'inherit', fontSize: { xs: '1.4rem', sm: '1.7rem', color: 'primary.contrastText' } }}
            />
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', color: 'primary.contrastText' } }}>
              {streakCount}
            </Typography>
          </Box>
          <DailyHabitIcons id={id} targetDays={targetDays} completedDays={completedDays} weekDates={weekDates} />
        </Box>

        <Typography
          variant="h6"
          sx={{ textAlign: 'left', fontSize: { xs: '1rem', sm: '1.2rem', color: 'primary.contrastText' } }}
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
          <Typography
            variant="body2"
            sx={{ textAlign: 'left', fontSize: { sm: '1rem' }, color: 'primary.contrastText' }}
          >
            {completedDays.length < targetDaysCount
              ? `${completedDays.length} out of ${targetDaysCount}`
              : 'Goal reached!'}
          </Typography>
          <Chip
            label={tag[0]}
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
    </Box>
  );
};

export default HabitBox;
