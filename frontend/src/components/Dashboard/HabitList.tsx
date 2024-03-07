import React from "react";
import { Container, IconButton } from "@mui/material";
import HabitBox, { HabitProps } from "./HabitBox";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const listOfHabits: HabitProps[] = [
  {
    id: 1,
    habitName: 'Read',
    streakCount: 4,
    goalCount: 3,
    statement: 'read 10 pages',
    goalDays: [0, 3, 6],
    completedDays: [1, 3],
    tags: ['Personal development ']
  },
  {
    id: 2,
    habitName: 'Workout',
    streakCount: 3,
    goalCount: 1,
    statement: 'workout for 10 minutes',
    goalDays: [ 1 ],
    completedDays: [1, 3, 0],
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
        <HabitBox 
          key={habit.id}
          id={habit.id} 
          habitName={habit.habitName} 
          streakCount={habit.streakCount}
          goalCount={habit.goalCount}
          statement={habit.statement}
          goalDays={habit.goalDays}
          completedDays={habit.completedDays}
          tags={habit.tags} />
      ))}
      <IconButton sx={{ color: 'addButton.main', fontSize: 'large', p: '0', mt: { xs: 2, sm: 3}}}>
        <AddCircleRoundedIcon sx={{ fontSize: { xs: '2.3rem', sm: '2.7rem' } }}/>
      </IconButton>
    </Container>
  )
}

export default HabitList;
