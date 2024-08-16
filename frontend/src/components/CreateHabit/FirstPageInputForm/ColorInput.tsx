import React from 'react';
import { Box, IconButton, Input, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { CustomTypography } from '../../helpers/CustomTypography';

interface ColorInputProps {
  colorValue: string;
  setIsColorPicker: Function;
}

const ColorInput: React.FC<ColorInputProps> = ({ colorValue, setIsColorPicker }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '3rem',
        mb: '4rem',
      }}
    >
      <CustomTypography variant="h1" sx={{ color: 'secondary.contrastText', fontSize: '2rem', mr: '1rem' }}>
        Color
      </CustomTypography>
      <Input id="habitColor" name="habitColor" type="text" value={colorValue} style={{ display: 'none' }} />
      <IconButton onClick={() => setIsColorPicker(true)} sx={{ p: 0, mb: '0.3rem' }}>
        <CircleIcon sx={{ color: colorValue, fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default ColorInput;
