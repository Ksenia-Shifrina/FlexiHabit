import React from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { InputValuesFormat, TargetDay } from '../../types/inputTypes';
import { daysOfWeekLong } from '../../utils/dateUtils';
import { CustomTypography } from '../helpers/CustomTypography';

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
    <Box
      sx={{
        mb: '1rem',
        bgcolor: 'secondary.main',
        borderRadius: '10px',
        boxShadow: 1,
        width: '100%',
        py: '1.5rem',
        px: '1rem',
      }}
    >
      <CustomTypography variant="h1" sx={{ fontSize: '1.5rem', color: 'secondary.contrastText' }}>
        I am planning to do it on
      </CustomTypography>

      <FormControl sx={{ mt: '1.5rem' }} component="fieldset" variant="standard">
        <FormGroup sx={{ flexDirection: 'row', gap: '0.15rem' }}>
          {daysOfWeekLong.map((day, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={!!targetDaysValue[index]}
                  onChange={handleTargetDaysInput}
                  name={index.toString()}
                  sx={{
                    color: 'secondary.contrastText',
                    '&.Mui-checked': {
                      color: 'secondary.contrastText',
                    },
                    padding: '0rem',
                  }}
                />
              }
              label={day}
              labelPlacement="top"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: 'Kalam',
                  fontSize: '1.2rem',
                },
              }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default TargetDaysInput;
