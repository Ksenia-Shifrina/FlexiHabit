import React from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { InputValuesFormat, TargetDay } from '../../types/inputTypes';
import { daysOfWeekLong } from '../../utils/dateUtils';

interface TargetDaysInputProps {
  targetDaysValue: TargetDay;
  setInputValues: Function;
}

const TargetDaysInput: React.FC<TargetDaysInputProps> = ({ targetDaysValue, setInputValues }) => {
  const handleTargetDaysInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dayIndex = Number(event.target.name);
    setInputValues((prevState: InputValuesFormat) => ({
      ...prevState,
      targetDaysValue: {
        ...prevState.targetDaysValue,
        [dayIndex]: event.target.checked,
      },
    }));
  };

  return (
    <Box sx={{}}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          {daysOfWeekLong.map((day, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox checked={targetDaysValue[index]} onChange={handleTargetDaysInput} name={index.toString()} />
              }
              label={day}
              labelPlacement="top"
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default TargetDaysInput;
