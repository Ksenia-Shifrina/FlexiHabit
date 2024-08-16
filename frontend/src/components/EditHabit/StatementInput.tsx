import React, { useState } from 'react';
import { Box, FormControl, Grid, Input, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { InputValuesFormat } from '../../types/inputTypes';
import { validFrequency } from '../../helpers/inputHelpers';
import { CustomTypography } from '../helpers/CustomTypography';

interface StatementInputProps {
  statementValue: string;
  setInputValues: Function;
}

const StatementInput: React.FC<StatementInputProps> = ({ statementValue, setInputValues }) => {
  const handleStatementInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, statementValue: event.target.value }));
  };

  return (
    <Grid container sx={{ flexGrow: 1, width: '100%', mt: '1rem' }}>
      <Grid item sx={{ display: 'flex', direction: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <CustomTypography variant="h1" sx={{ fontSize: '1.5rem', color: 'secondary.contrastText', mb: '1rem' }}>
          I <span style={{ textDecoration: 'underline' }}>will</span> at the very least
        </CustomTypography>
      </Grid>

      <Grid
        item
        sx={{
          ml: '0rem',
          width: '100%',
        }}
      >
        <Input
          required
          id="habitStatement"
          name="habitStatement"
          type="text"
          placeholder="read 5 pages"
          value={statementValue}
          onChange={handleStatementInput}
          sx={{ width: '70%', color: 'secondary.contrastText' }}
          inputProps={{
            style: { textAlign: 'center', width: '100%', fontSize: '1.5rem', fontFamily: 'Kalam' },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default StatementInput;
