import { IconButton } from '@mui/material';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import React from 'react';

export interface ActiveTargetIconProps {
  handleDragEnd: Function;
  handleDragStart: Function;
  markDayAsCompleted: Function;
  index: number;
  date: Date;
  id: string;
}

const ActiveTargetIcon: React.FC<ActiveTargetIconProps> = ({
  handleDragEnd,
  handleDragStart,
  markDayAsCompleted,
  index,
  date,
  id,
}) => {
  return (
    <IconButton
      key={index}
      onClick={() => markDayAsCompleted(date, id)}
      draggable={true}
      onDragStart={() => handleDragStart(index)}
      onDragEnd={() => handleDragEnd()}
      onDragOver={(event) => event.preventDefault()}
      sx={{ color: 'icons.dark', fontSize: 'large', p: '0', mx: 'auto' }}
    >
      <AdjustRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
    </IconButton>
  );
};

export default ActiveTargetIcon;
