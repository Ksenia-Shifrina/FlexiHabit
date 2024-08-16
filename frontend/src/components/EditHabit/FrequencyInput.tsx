import React, { useState } from 'react';
import { Box, FormControl, Grid, Input, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { InputValuesFormat } from '../../types/inputTypes';
import { validFrequency } from '../../helpers/inputHelpers';
import { CustomTypography } from '../helpers/CustomTypography';

interface FrequencyInputProps {
  frequencyValue: number;
  setInputValues: Function;
}

const FrequencyInput: React.FC<FrequencyInputProps> = ({ frequencyValue, setInputValues }) => {
  const [timeOrTimes, setTimeOrTimes] = useState<string>(frequencyValue.toString());

  React.useEffect(() => {
    setTimeOrTimes(frequencyValue.toString());
  }, [frequencyValue]);

  const handleFrequencyInput = (event: SelectChangeEvent) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, frequencyValue: Number(event.target.value) }));
    setTimeOrTimes(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{ direction: 'row', justifyContent: 'flex-end', alignItems: 'center', mt: '1rem', mb: '2.5rem' }}
      >
        <Grid item>
          <FormControl sx={{ minWidth: 50 }} variant="standard" size="medium">
            <Select
              id="habitFrequency"
              name="habitFrequency"
              value={frequencyValue.toString()}
              onChange={handleFrequencyInput}
              autoWidth
              sx={{ fontSize: '1.2rem', color: 'secondary.contrastText', fontFamily: 'Kalam' }}
            >
              {validFrequency.map((fr, index) => (
                <MenuItem key={index} value={fr}>
                  {fr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sx={{ ml: '1rem' }}>
          <CustomTypography variant="h1" sx={{ fontSize: '1.5rem', color: 'secondary.contrastText' }}>
            {timeOrTimes == '1' ? 'time' : 'times'} a week.
          </CustomTypography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FrequencyInput;
