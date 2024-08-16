import React, { useState } from 'react';
import { Box, Grid, Input, Typography } from '@mui/material';
import { InputValuesFormat } from '../../../types/inputTypes';
import { CustomTypography } from '../../helpers/CustomTypography';

interface StatementInputProps {
  statementValue: string;
  setInputValues: Function;
  isShortStatement: boolean;
  setIsShortStatement: Function;
}

const StatementInput: React.FC<StatementInputProps> = ({
  statementValue,
  setInputValues,
  isShortStatement,
  setIsShortStatement,
}) => {
  const handleStatementInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, statementValue: event.target.value }));
    if (event.target.value.length > 16) {
      setIsShortStatement(false);
    }
    if (event.target.value.length <= 16) {
      setIsShortStatement(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: 'auto' }}>
      <Grid
        container
        sx={{ width: 'auto', direction: 'row', justifyContent: 'center', alignItems: 'center', mt: '1rem' }}
      >
        <Grid item>
          <CustomTypography variant="h1" sx={{ fontSize: '1.5rem', color: 'secondary.contrastText' }}>
            I <span style={{ textDecoration: 'underline' }}>will</span> at the very least
          </CustomTypography>
        </Grid>

        <Grid
          item
          sx={isShortStatement ? { ml: '1rem', width: 'auto', mt: '0rem' } : { ml: '0rem', width: '100%', mt: '1rem' }}
        >
          <Input
            required
            id="habitStatement"
            name="habitStatement"
            type="text"
            placeholder="read 5 pages"
            value={statementValue}
            onChange={handleStatementInput}
            sx={{ width: '100%', color: 'secondary.contrastText' }}
            inputProps={{
              style: { textAlign: 'center', width: '100%', fontSize: '1.5rem', fontFamily: 'Kalam' },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatementInput;
