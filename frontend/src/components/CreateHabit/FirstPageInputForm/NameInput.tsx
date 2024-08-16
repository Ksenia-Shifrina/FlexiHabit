import React from 'react';
import { Box, Input, Typography } from '@mui/material';
import { InputValuesFormat } from '../../../types/inputTypes';
import { CustomTypography } from '../../helpers/CustomTypography';

interface NameInputProps {
  nameValue: string;
  setInputValues: Function;
}

const NameInput: React.FC<NameInputProps> = ({ nameValue, setInputValues }) => {
  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, nameValue: event.target.value }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '4rem',
      }}
    >
      <CustomTypography variant="h1" sx={{ color: 'secondary.contrastText', fontSize: '2rem', mb: '2rem' }}>
        Short name for my habit
      </CustomTypography>

      <Input
        required
        id="habitName"
        name="habitName"
        type="text"
        placeholder="Read"
        value={nameValue}
        onChange={handleNameInput}
        sx={{ width: 'auto', fontSize: '2rem', color: 'secondary.contrastText' }}
        inputProps={{
          style: { textAlign: 'center', fontFamily: 'Kalam' },
        }}
      />
    </Box>
  );
};

export default NameInput;
