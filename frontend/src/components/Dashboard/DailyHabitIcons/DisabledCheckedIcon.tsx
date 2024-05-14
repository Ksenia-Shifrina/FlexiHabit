import { IconButton } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import React from 'react';

export interface DisabledCheckedIconProps {
  handleDrop: Function;
  index: number;
  date: Date;
}

const DisabledCheckedIcon: React.FC<DisabledCheckedIconProps> = ({ handleDrop, index, date }) => {
  return (
    <IconButton
      key={index}
      onDrop={(event) => handleDrop(event, date)}
      onDragOver={(event) => event.preventDefault()}
      sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}
    >
      <CheckRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
    </IconButton>
  );
};

export default DisabledCheckedIcon;
