import React from "react";
import { Container, IconButton } from "@mui/material";
import Habit, { HabitProps } from "./Habit";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const listOfHabits: HabitProps[] = [
  {
    id: 1,
    habitName: 'Read',
    streakCount: 4,
    goalCount: 3,
    currentCount: 1,
    minGoal: 'I will read 10 pages 5 times a week.',
    days: ['Mon', 'Wed', 'Fri'],
    tags: ['Personal development ', 'Learning']
  },
  {
    id: 2,
    habitName: 'Gym',
    streakCount: 3,
    goalCount: 2,
    currentCount: 1,
    minGoal: 'I will workout for 10 minutes 4 times a week.',
    days: ['Mon', 'Thu', 'Sat'],
    tags: ['Health']
  }
]

const HabitList: React.FC = () => {
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 0
      }}>
      {listOfHabits.map((habit) => (
        <Habit 
          key={habit.id}
          id={habit.id} 
          habitName={habit.habitName} 
          streakCount={habit.streakCount}
          goalCount={habit.goalCount}
          currentCount={habit.currentCount}
          minGoal={habit.minGoal}
          days={habit.days}
          tags={habit.tags} />
      ))}
      <IconButton sx={{ color: 'addButton.main', fontSize: 'large', p: '0', mt: { xs: 2, sm: 3}}}>
        <AddCircleRoundedIcon sx={{ fontSize: { xs: '2.3rem', sm: '2.7rem' } }}/>
      </IconButton>
    </Container>
  )
}

export default HabitList;
