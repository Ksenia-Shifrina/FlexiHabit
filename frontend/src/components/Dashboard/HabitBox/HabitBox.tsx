import React from 'react';
import { Box } from '@mui/material';
import BackgroundBox from './BackgroundBox';
import MainBoxGradient from './MainBoxGradient';
import MainBoxContent from './MainBoxContent';

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
  const color = habit.color;
  const targetDaysDefaultCount = targetDaysDefault.length;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        p: { xs: 1.5, sm: 2 },
        borderRadius: '10px',
        width: { xs: '90%', sm: '80%' },
        maxWidth: '550px',
        maxHeight: { xs: '95px', sm: '120px' },
        ml: { xs: 2, sm: 0 },
        mt: { xs: 6.5, sm: 8 },
      }}
    >
      <BackgroundBox targetDaysDefaultCount={targetDaysDefaultCount} statement={statement} id={id} />
      <MainBoxGradient targetDays={targetDays} completedDays={completedDays} color={color} />
      <MainBoxContent
        habitName={habitName}
        tag={tag}
        targetDays={targetDays}
        completedDays={completedDays}
        streak={streak}
        targetDaysDefault={targetDaysDefault}
        targetDaysDefaultCount={targetDaysDefaultCount}
        id={id}
        weekDates={weekDates}
        setFetchedHabits={setFetchedHabits}
      />
    </Box>
  );
};

export default HabitBox;
