import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { InputValuesFormat } from '../../types/inputTypes';
import { colorOptions } from '../../helpers/inputHelpers';

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
    <Box sx={{ flexGrow: 1, maxWidth: '350px' }}>
      <Grid container rowSpacing={2} sx={{ mt: '2rem' }}>
        {colorOptions.map((color, index) => (
          <Grid item xs={4}>
            <IconButton key={index} onClick={() => handleColorInput(color)}>
              <CircleIcon sx={{ color: color, fontSize: 60 }} />
            </IconButton>
          </Grid>
        ))}
        <Grid item xs={12} sx={{ mb: '3rem' }}>
          <IconButton onClick={() => setIsColorPicker(false)} style={{ padding: 0, marginTop: '2rem' }}>
            <KeyboardReturnRoundedIcon sx={{ color: 'icons.light', fontSize: 40 }} />
          </IconButton>
        </Grid>
      </Grid>

      {/* <Box>
      {colorOptions.map((color, index) => (
        <IconButton key={index} onClick={() => handleColorInput(color)}>
          <CircleIcon sx={{ color: color, fontSize: 35 }} />
        </IconButton>
      ))}
      <IconButton onClick={() => setIsColorPicker(false)} style={{ padding: 0 }}>
        <UndoRoundedIcon sx={{ color: 'icons.light', fontSize: 35 }} />
      </IconButton>
    </Box> */}
    </Box>
  );
};

export default ColorPicker;
