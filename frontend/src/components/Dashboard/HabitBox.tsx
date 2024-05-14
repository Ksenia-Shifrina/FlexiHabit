import React, { useContext } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DailyHabitIcons from './DailyHabitIcons';
import ColorModeContext from '../../contexts/ColorModeContext';
import { darkenColor } from '../../helpers/darkenColor';

export interface HabitBoxProps {
  habit: {
    id: string;
    habitName: string;
    statement: string;
    tag: string;
    targetDaysDefault: number[];
    targetDays: Date[];
    completedDays: Date[];
    streak: number;
    color: string;
  };
  weekDates: Date[];
  setFetchedHabits: Function;
}

const HabitBox: React.FC<HabitBoxProps> = ({ habit, weekDates, setFetchedHabits }) => {
  const id = habit.id;
  const habitName = habit.habitName;
  const streak = habit.streak;
  const statement = habit.statement;
  const targetDaysDefault = habit.targetDaysDefault;
  const targetDays = habit.targetDays;
  const completedDays = habit.completedDays;
  const tag = habit.tag;
  const targetDaysDefaultCount = targetDaysDefault.length;

  let habitColor = habit.color;
  const { mode } = useContext(ColorModeContext);
  if (mode === 'dark') {
    habitColor = darkenColor(habitColor, 10);
  }

  const completionRatio = (completedDays.length / targetDays.length) * 100;

  const beforeStyle =
    completionRatio < 100 && completionRatio > 0
      ? {
          content: '""',
          position: 'absolute',
          left: `${completionRatio}%`,
          top: 0,
          width: '6%',
          height: '100%',
          backgroundColor: habitColor,
          borderRadius: '0% 0% 100% 0%',
        }
      : {};

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
          justifyContent: 'space-between',
          pl: { xs: 1.5, sm: 3 },
          pt: { xs: 1, sm: 1.5 },
          m: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{ textAlign: 'left', color: 'secondary.contrastText', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          {targetDaysDefaultCount === 7 && `I will ${statement} every day.`}
          {targetDaysDefaultCount === 1 && `I will ${statement} 1 time a week.`}
          {targetDaysDefaultCount > 1 &&
            targetDaysDefaultCount < 7 &&
            `I will ${statement} ${targetDaysDefaultCount} times a week.`}
        </Typography>
        <IconButton
          sx={{
            color: 'icons.light',
            mr: 1.5,
            p: 0,
          }}
        >
          <EditRoundedIcon
            sx={{
              fontSize: { xs: '0.7rem', sm: '1rem' },
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          borderRadius: 'inherit',
          backgroundImage: `linear-gradient(to right, ${habitColor} ${completionRatio}%, transparent ${completionRatio + 1}%)`,
          transition: 'background-size 2s ease-in-out',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          '::before': beforeStyle,
        }}
      />
      <Box
        sx={{
          position: 'relative',
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
          <Typography
            variant="body2"
            sx={{ textAlign: 'left', fontSize: { sm: '1rem' }, color: 'primary.contrastText' }}
          >
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
    </Box>
  );
};

export default HabitBox;
