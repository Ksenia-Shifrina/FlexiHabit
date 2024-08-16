import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { validTags } from '../../helpers/inputHelpers';
import { InputValuesFormat } from '../../types/inputTypes';
import { CustomTypography } from '../helpers/CustomTypography';

interface EditTagInputProps {
  tagValue: string;
  setInputValues: Function;
}

const TagInput: React.FC<EditTagInputProps> = ({ tagValue, setInputValues }) => {
  const handleTagInput = (event: SelectChangeEvent) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, tagValue: event.target.value }));
  };

  return (
    <Box>
      <CustomTypography
        variant="h1"
        sx={{ fontSize: '1.5rem', mb: '1.5rem', mt: '3.5rem', color: 'secondary.contrastText' }}
      >
        Developing this habit will positively impact my
      </CustomTypography>

      <FormControl sx={{ minWidth: 250, mb: '2rem' }} variant="standard">
        <Select
          id="habitTag"
          name="habitTag"
          autoWidth
          value={tagValue}
          onChange={handleTagInput}
          sx={{ color: 'secondary.contrastText', fontFamily: 'Kalam', fontSize: '1.5rem' }}
        >
          {validTags.map((tag, index) => (
            <MenuItem key={index} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TagInput;
