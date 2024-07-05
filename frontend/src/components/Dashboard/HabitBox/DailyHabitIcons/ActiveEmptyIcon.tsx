import { IconButton } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React from 'react';

export interface ActiveEmptyIconprops {
  handleDrop: Function;
  markDayAsCompleted: Function;
  index: number;
  date: Date;
  id: string;
}

const ActiveEmptyIcon: React.FC<ActiveEmptyIconprops> = ({ handleDrop, markDayAsCompleted, index, date, id }) => {
  return (
    <IconButton
      key={index}
      onClick={() => markDayAsCompleted(date, id)}
      onDrop={(event) => handleDrop(event, date)}
      onDragOver={(event) => event.preventDefault()}
      sx={{ color: 'icons.dark', fontSize: 'large', p: '0', mx: 'auto' }}
    >
      <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
    </IconButton>
  );
};

export default ActiveEmptyIcon;
