import React from 'react';
import { Box, Input, Typography } from '@mui/material';
import { InputValuesFormat } from '../../types/inputTypes';
// import { InputValuesFormat } from '../../../types/inputTypes';

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
        my: '1rem',
      }}
    >
      <Input
        required
        id="habitName"
        name="habitName"
        type="text"
        placeholder="Read"
        value={nameValue}
        onChange={handleNameInput}
        inputProps={{
          style: { textAlign: 'center', fontSize: '2rem', fontFamily: 'Kalam' },
        }}
      />
    </Box>
  );
};

export default NameInput;
