import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { InputValuesFormat } from '../../../types/inputTypes';
import NameInput from './NameInput';
import ColorInput from './ColorInput';
import ColorPicker from './ColorPicker';

export interface PagesNewHabitFormProps {
  displayNewPage: Function;
  inputValues: InputValuesFormat;
  setInputValues: Function;
}

const FirstPageInputForm: React.FC<PagesNewHabitFormProps> = ({ displayNewPage, inputValues, setInputValues }) => {
  const [isColorPicker, setIsColorPicker] = useState<boolean>(false);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!isColorPicker && (
        <Box>
          <NameInput nameValue={inputValues.nameValue} setInputValues={setInputValues} />
          <ColorInput colorValue={inputValues.colorValue} setIsColorPicker={setIsColorPicker} />
          <IconButton
            onClick={() => displayNewPage(1)}
            sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}
          >
            Next <ChevronRightRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
          </IconButton>
        </Box>
      )}
      {isColorPicker && <ColorPicker setIsColorPicker={setIsColorPicker} setInputValues={setInputValues} />}
    </Box>
  );
};

export default FirstPageInputForm;
