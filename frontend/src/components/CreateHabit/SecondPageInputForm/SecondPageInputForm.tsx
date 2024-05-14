import { Box, IconButton, Input, SelectChangeEvent, Typography } from '@mui/material';
import React, { useState } from 'react';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { InputValuesFormat } from '../../../types/inputTypes';
import ActivityAndFrequencyInputs from './ActivityAndFrequencyInputs';
import { PagesNewHabitFormProps } from '../FirstPageInputForm/FirstPageInputForm';

const SecondPageInputForm: React.FC<PagesNewHabitFormProps> = ({ displayNewPage, inputValues, setInputValues }) => {
  const handleActivityInput = (enteredActivity: string) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, activityValue: enteredActivity }));
  };

  const handleFrequencyInput = (enteredFrequency: number) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, frequencyValue: enteredFrequency }));
  };

  return (
    <Box sx={{}}>
      <ActivityAndFrequencyInputs
        activityValue={inputValues.activityValue}
        frequencyValue={inputValues.frequencyValue}
        setInputValues={setInputValues}
      />
      <IconButton onClick={() => displayNewPage(-1)} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        <ChevronLeftRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </IconButton>
      <IconButton onClick={() => displayNewPage(1)} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        Next
        <ChevronRightRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </IconButton>
    </Box>
  );
};

export default SecondPageInputForm;
