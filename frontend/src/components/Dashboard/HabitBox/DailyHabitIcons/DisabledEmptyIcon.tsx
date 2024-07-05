import { IconButton } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React from 'react';

export interface FDisabledEmptyIconProps {
  index: number;
  date: Date;
  handleDrop: Function;
}

const DisabledEmptyIcon: React.FC<FDisabledEmptyIconProps> = ({ index, date, handleDrop }) => {
  return (
    <IconButton
      key={index}
      onDrop={(event) => handleDrop(event, date)}
      onDragOver={(event) => event.preventDefault()}
      sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}
    >
      <RadioButtonUncheckedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
    </IconButton>
  );
};

export default DisabledEmptyIcon;
