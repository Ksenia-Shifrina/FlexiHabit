import React from 'react';
import { Box, IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { InputValuesFormat } from '../../../types/inputTypes';
import { colorOptions } from '../../../helpers/inputHelpers';

interface ColorPickerProps {
  setInputValues: Function;
  setIsColorPicker: Function;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ setInputValues, setIsColorPicker }) => {
  const handleColorInput = (chosenColor: string) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, colorValue: chosenColor }));
    setIsColorPicker(false);
  };

  return (
    <Box>
      {colorOptions.map((color, index) => (
        <IconButton key={index} onClick={() => handleColorInput(color)}>
          <CircleIcon sx={{ color: color, fontSize: 35 }} />
        </IconButton>
      ))}
      <IconButton onClick={() => setIsColorPicker(false)} style={{ padding: 0 }}>
        <UndoRoundedIcon sx={{ color: 'icons.light', fontSize: 35 }} />
      </IconButton>
    </Box>
  );
};

export default ColorPicker;
