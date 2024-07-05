import React from 'react';
import { Box, FormControl, Input, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { InputValuesFormat } from '../../../types/inputTypes';
import { validFrequency } from '../../../helpers/inputHelpers';

interface StatementAndFrequencyInputsProps {
  statementValue: string;
  frequencyValue: number;
  setInputValues: Function;
}

const StatementAndFrequencyInputs: React.FC<StatementAndFrequencyInputsProps> = ({
  statementValue,
  frequencyValue,
  setInputValues,
}) => {
  const handleStatementInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, statementValue: event.target.value }));
  };

  const handleFrequencyInput = (event: SelectChangeEvent) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, frequencyValue: Number(event.target.value) }));
  };

  return (
    <Box sx={{}}>
      <Typography variant="h1" sx={{ fontSize: '2rem', mb: '2rem' }}>
        I will at the very least
      </Typography>
      <Input
        required
        id="habitStatement"
        name="habitStatement"
        type="text"
        placeholder="read 5 pages"
        value={statementValue}
        onChange={handleStatementInput}
        inputProps={{
          style: { textAlign: 'center', fontSize: '1.5rem' },
        }}
      />
      <FormControl sx={{ minWidth: 50 }} variant="standard">
        <Select
          id="habitFrequency"
          name="habitFrequency"
          value={frequencyValue.toString()}
          onChange={handleFrequencyInput}
        >
          {validFrequency.map((fr, index) => (
            <MenuItem key={index} value={fr}>
              {fr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h1" sx={{ fontSize: '2rem', mb: '2rem' }}>
        times a week.
      </Typography>
    </Box>
  );
};

export default StatementAndFrequencyInputs;
