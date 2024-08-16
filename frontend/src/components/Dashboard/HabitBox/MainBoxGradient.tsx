import React, { useContext } from 'react';
import { Box, useTheme } from '@mui/material';
import ColorModeContext from '../../../contexts/ColorModeContext';
import { darkenColor } from '../../../helpers/darkenColor';

export interface MainBoxGradientProps {
  targetDays: Date[];
  completedDays: Date[];
  color: string;
}

const MainBoxGradient: React.FC<MainBoxGradientProps> = ({ targetDays, completedDays, color }) => {
  const theme = useTheme();

  let habitColor = color;
  const { mode } = useContext(ColorModeContext);
  if (mode === 'dark') {
    habitColor = darkenColor(habitColor, 10);
  }

  let completionRatio = 0;
  if (targetDays.length > 0) {
    completionRatio = (completedDays.length / targetDays.length) * 100;
  }

  const beforeStyle =
    completionRatio < 100 && completionRatio > 0
      ? {
          content: '""',
          position: 'absolute',
          left: `${completionRatio - 0.5}%`,
          top: 0,
          width: '6%',
          height: '100%',
          backgroundColor: habitColor,
          borderRadius: '0% 0% 100% 0%',
        }
      : {};

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        borderRadius: 'inherit',
        backgroundImage: `linear-gradient(to right, ${habitColor} ${completionRatio}%, ${theme.palette.primary.main} ${completionRatio}%)`,
        boxShadow: 1,
        transition: 'background-size 2s ease-in-out',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 2,
        '::before': beforeStyle,
      }}
    />
  );
};

export default MainBoxGradient;
