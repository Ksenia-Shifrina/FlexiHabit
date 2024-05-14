import React from 'react';
import { Box, Input, Typography } from '@mui/material';
import { InputValuesFormat } from '../../../types/inputTypes';

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
        m: '4rem',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '2rem', mb: '2rem' }}>
        Short name for my habit
      </Typography>
      <Input
        required
        id="habitName"
        name="habitName"
        type="text"
        placeholder="Read"
        value={nameValue}
        onChange={handleNameInput}
        inputProps={{
          style: { textAlign: 'center', fontSize: '1.5rem' },
        }}
      />
    </Box>
  );
};

export default NameInput;
