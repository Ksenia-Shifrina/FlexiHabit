import { Box, Button, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { useState } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { InputValuesFormat } from '../../../types/inputTypes';
import { PagesNewHabitFormProps } from '../FirstPageInputForm/FirstPageInputForm';
import { validTags } from '../../../helpers/inputHelpers';

const ThirdPageInputForm: React.FC<PagesNewHabitFormProps> = ({ displayNewPage, inputValues, setInputValues }) => {
  const handleTagInput = (event: SelectChangeEvent) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, tagValue: event.target.value }));
  };

  return (
    <Box sx={{}}>
      <FormControl fullWidth>
        <Select id="habitTag" name="habitTag" value={inputValues.tagValue} onChange={handleTagInput}>
          {validTags.map((tag) => (
            <MenuItem value={tag}>{tag}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton onClick={() => displayNewPage(-1)} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        <ChevronLeftRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </IconButton>
      <IconButton type="submit" sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        Save
      </IconButton>
    </Box>
  );
};

export default ThirdPageInputForm;
