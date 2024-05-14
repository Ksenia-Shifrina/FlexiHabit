import React from 'react';
import { Box, FormControl } from '@mui/material';
import { InputValuesFormat } from '../../../types/inputTypes';

interface TargetDaysInputProps {
  targetDaysValue: string;
  setInputValues: Function;
}

const TargetDaysInput: React.FC<TargetDaysInputProps> = ({ targetDaysValue, setInputValues }) => {
  const handleTargetDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, targetDaysValue: event.target.value }));
  };

  return (
    <Box sx={{}}>
      <FormControl fullWidth></FormControl>
    </Box>
  );
};

export default TargetDaysInput;
