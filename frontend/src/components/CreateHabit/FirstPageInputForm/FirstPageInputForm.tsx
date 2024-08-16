import React, { useState } from 'react';
import { Box } from '@mui/material';
import { InputValuesFormat } from '../../../types/inputTypes';
import NameInput from './NameInput';
import ColorInput from './ColorInput';
import ColorPicker from './ColorPicker';
import ChangePageButton from '../../helpers/ChangePageButton';
import PageContentWrapper from '../../helpers/PageContentWrapper';

export interface PagesNewHabitFormProps {
  displayNewPage: Function;
  inputValues: InputValuesFormat;
  setInputValues: Function;
}

const FirstPageInputForm: React.FC<PagesNewHabitFormProps> = ({ displayNewPage, inputValues, setInputValues }) => {
  const [isColorPicker, setIsColorPicker] = useState<boolean>(false);

  return (
    <Box sx={{ height: '100%' }}>
      {!isColorPicker && (
        <PageContentWrapper>
          <NameInput nameValue={inputValues.nameValue} setInputValues={setInputValues} />
          <ColorInput colorValue={inputValues.colorValue} setIsColorPicker={setIsColorPicker} />

          <ChangePageButton displayNewPage={displayNewPage} direction={1} />
        </PageContentWrapper>
      )}
      {isColorPicker && <ColorPicker setIsColorPicker={setIsColorPicker} setInputValues={setInputValues} />}
    </Box>
  );
};

export default FirstPageInputForm;
