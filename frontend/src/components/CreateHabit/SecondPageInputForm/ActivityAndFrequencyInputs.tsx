import React from 'react';
import { Box, FormControl, Input, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { InputValuesFormat } from '../../../types/inputTypes';
import { validFrequency } from '../../../helpers/inputHelpers';

interface ActivityAndFrequencyInputsProps {
  activityValue: string;
  frequencyValue: number;
  setInputValues: Function;
}

const ActivityAndFrequencyInputs: React.FC<ActivityAndFrequencyInputsProps> = ({
  activityValue,
  frequencyValue,
  setInputValues,
}) => {
  const handleActivityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, activityValue: event.target.value }));
  };

  const handleFrequencyInput = (event: SelectChangeEvent) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, frequencyValue: Number(event.target.value) }));
  };

  return (
    <Box sx={{}}>
      <Input
        required
        id="habitActivity"
        name="habitActivity"
        type="text"
        placeholder="read 5 pages"
        value={activityValue}
        onChange={handleActivityInput}
        inputProps={{
          style: { textAlign: 'center', fontSize: '1.5rem' },
        }}
      />
      <FormControl fullWidth>
        <Select
          id="habitFrequency"
          name="habitFrequency"
          value={frequencyValue.toString()}
          onChange={handleFrequencyInput}
        >
          {validFrequency.map((fr) => (
            <MenuItem value={fr}>{fr}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ActivityAndFrequencyInputs;
