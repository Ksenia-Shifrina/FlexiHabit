import { IconButton } from '@mui/material';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import React from 'react';

export interface FutureDefaultTargetIconProps {
  index: number;
}

const FutureDefaultTargetIcon: React.FC<FutureDefaultTargetIconProps> = ({ index }) => {
  return (
    <IconButton
      key={index}
      onDragOver={(event) => event.preventDefault()}
      sx={{ color: 'icons.light', fontSize: 'large', p: '0', mx: 'auto' }}
    >
      <AdjustRoundedIcon sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
    </IconButton>
  );
};

export default FutureDefaultTargetIcon;
