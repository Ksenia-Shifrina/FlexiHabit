import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { validTags } from '../../helpers/inputHelpers';
import { InputValuesFormat } from '../../types/inputTypes';

interface EditTagInputProps {
  tagValue: string;
  setInputValues: Function;
}

const TagInput: React.FC<EditTagInputProps> = ({ tagValue, setInputValues }) => {
  const handleTagInput = (event: SelectChangeEvent) => {
    setInputValues((prevState: InputValuesFormat) => ({ ...prevState, tagValue: event.target.value }));
  };

  return (
    <Box sx={{}}>
      <FormControl fullWidth>
        <Select id="habitTag" name="habitTag" value={tagValue} onChange={handleTagInput}>
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
