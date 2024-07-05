import { IconButton } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import React from 'react';

export interface ActiveCheckedIconProps {
  handleDrop: Function;
  unmarkDayAsCompleted: Function;
  index: number;
  date: Date;
  id: string;
}

const ActiveCheckedIcon: React.FC<ActiveCheckedIconProps> = ({ handleDrop, unmarkDayAsCompleted, index, date, id }) => {
  return (
    <IconButton
      key={index}
      onClick={() => unmarkDayAsCompleted(date, id)}
      onDrop={(event) => handleDrop(event, date)}
      onDragOver={(event) => event.preventDefault()}
      sx={{ color: 'icons.dark', fontSize: 'large', p: '0', mx: 'auto' }}
    >
      <CheckRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
    </IconButton>
  );
};

export default ActiveCheckedIcon;
