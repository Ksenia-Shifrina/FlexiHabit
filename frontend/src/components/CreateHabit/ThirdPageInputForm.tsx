import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export interface PageProps {
  displayNewPage: Function;
}

const ThirdPageInputForm: React.FC<PageProps> = ({ displayNewPage }) => {
  const handlePrevPage = () => {
    displayNewPage(-1);
  };
  return (
    <Box sx={{}}>
      hey3
      <IconButton onClick={handlePrevPage} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        <ChevronLeftRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </IconButton>
    </Box>
  );
};

export default ThirdPageInputForm;
