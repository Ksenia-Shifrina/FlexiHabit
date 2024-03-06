import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Tooltip,
  Chip,
  Container,
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import BoltIcon from '@mui/icons-material/Bolt';

export interface HabitProps {
  id: number;
  habitName: string;
  streakCount: number,
  goalCount: number,
  currentCount: number,
  minGoal: string,
  days: string[],
  tags: string[]
}

const Habit: React.FC<HabitProps> = ({ habitName, currentCount, goalCount, streakCount, minGoal, tags }) => {
  return (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      p: { xs: 1.5, sm: 2},
      bgcolor: 'primary.main',
      borderRadius: '10px',
      boxShadow: 1,
      width: {xs: '90%', sm: '80%'},
      maxWidth: '550px',
      maxHeight: { xs: '90px', sm: '120px'},
      ml: { xs: 2, sm: 0},
      mt: { xs: 7, sm: 8 }
    }}>
      <Box sx={{
        position: 'absolute',
        top: {xs: -55, sm: -65},
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
        pl: { xs: 1.5, sm: 3},
        pt: {xs: 1, sm: 1.5},
        m: 3
      }}>
        <Typography variant="body2" sx={{ textAlign: 'left', color: 'secondary.contrastText', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
          {minGoal}
        </Typography>
      </Box>

      <Box sx={{ 
        flexGrow: {xs: 0.4, sm: 0.6, md: 0.7}, 
        ml: { xs: 0.5, sm: 2},
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'left', 
          justifyContent: 'left', 
          mb: { xs: 0.5, sm: 1 }, 
          ml: -1 
        }}>
          <BoltIcon sx={{ color: 'inherit', fontSize: { xs: '1.4rem', sm: '1.7rem', color: 'primary.contrastText' } }} />
          <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1.2rem', color: 'primary.contrastText' }}} >
            {streakCount}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ textAlign: 'left', fontSize: { xs: '0.9rem', sm: '1.2rem', color: 'primary.contrastText' } }}>
          {habitName}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'left', fontSize: { xs: '0.9rem', sm: '1.2rem', color: 'primary.contrastText' } }}>
          {`${currentCount}/${goalCount}`}
        </Typography>
      </Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between',  
        flexGrow: {xs: 0.7, sm: 1, md: 1}
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          mb: { xs: 1.5, sm: 3}, 
          width: '100%'
        }}> 
          {Array.from({ length: 7 }, (_, index) => (
            <IconButton key={index} sx={{ color: 'icons.light', fontSize: 'large', p: '0'}}>
              <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}/>
            </IconButton>
          ))}
        </Box>  
        <Chip label={tags[0]} size="small" sx={{ 
          fontSize: { xs: '0.7rem', sm: '0.8rem' }, 
          bgcolor: 'tags.main', 
          color: 'tags.contrastText', 
          borderRadius: '15px' }} />
      </Box>
    </Box>
  )
}

export default Habit;
