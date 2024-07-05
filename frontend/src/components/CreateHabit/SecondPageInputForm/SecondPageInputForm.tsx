import { Box, IconButton, Input, SelectChangeEvent, Typography } from '@mui/material';
import React, { useState } from 'react';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { InputValuesFormat } from '../../../types/inputTypes';
import StatementAndFrequencyInputs from './StatementAndFrequencyInputs';
import { PagesNewHabitFormProps } from '../FirstPageInputForm/FirstPageInputForm';
import TargetDaysInput from './TargetDaysInput';

const SecondPageInputForm: React.FC<PagesNewHabitFormProps> = ({ displayNewPage, inputValues, setInputValues }) => {
  return (
    <Box sx={{}}>
      <StatementAndFrequencyInputs
        statementValue={inputValues.statementValue}
        frequencyValue={inputValues.frequencyValue}
        setInputValues={setInputValues}
      />
      <TargetDaysInput targetDaysValue={inputValues.targetDaysValue} setInputValues={setInputValues} />
      <IconButton onClick={() => displayNewPage(-1)} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        <ChevronLeftRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
        Back
      </IconButton>
      <IconButton onClick={() => displayNewPage(1)} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        Next
        <ChevronRightRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </IconButton>
    </Box>
  );
};

export default SecondPageInputForm;
