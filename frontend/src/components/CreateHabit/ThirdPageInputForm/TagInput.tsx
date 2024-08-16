import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { validTags } from '../../../helpers/inputHelpers';
import { InputValuesFormat } from '../../../types/inputTypes';

interface TagInputProps {
  tagValue: string;
  setInputValues: Function;
}

const TagInput: React.FC<TagInputProps> = ({ tagValue, setInputValues }) => {
  const handleTagInput = (event: SelectChangeEvent) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, tagValue: event.target.value }));
  };

  return (
    <FormControl sx={{ minWidth: 250, mb: '3rem' }} variant="standard">
      <Select
        id="habitTag"
        name="habitTag"
        value={tagValue}
        onChange={handleTagInput}
        autoWidth
        sx={{ color: 'secondary.contrastText', fontFamily: 'Kalam', fontSize: '1.5rem' }}
      >
        {validTags.map((tag, index) => (
          <MenuItem key={index} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagInput;
