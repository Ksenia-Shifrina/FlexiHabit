import React from 'react';
import { Box, FormControl, Input, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { InputValuesFormat } from '../../types/inputTypes';
import { validFrequency } from '../../helpers/inputHelpers';

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
      <FormControl fullWidth>
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
    </Box>
  );
};

export default StatementAndFrequencyInputs;
