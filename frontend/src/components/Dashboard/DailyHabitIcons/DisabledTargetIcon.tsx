import { IconButton } from '@mui/material';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import React from 'react';

export interface DisabledTargetIconProps {
  index: number;
  handleDragStart: Function;
  handleDragEnd: Function;
}

const DisabledTargetIcon: React.FC<DisabledTargetIconProps> = ({ index, handleDragStart, handleDragEnd }) => {
  return (
    <IconButton
      key={index}
      draggable={true}
      onDragStart={() => handleDragStart(index)}
      onDragEnd={() => handleDragEnd()}
      onDragOver={(event) => event.preventDefault()}
      sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}
    >
      <AdjustRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
    </IconButton>
  );
};

export default DisabledTargetIcon;
