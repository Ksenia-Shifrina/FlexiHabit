import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export interface PageProps {
  displayNewPage: Function;
}

const SecondPageInputForm: React.FC<PageProps> = ({ displayNewPage }) => {
  const handlePrevPage = () => {
    displayNewPage(-1);
  };
  const handleNextPage = () => {
    displayNewPage(1);
  };
  return (
    <Box sx={{}}>
      hey2
      <IconButton onClick={handlePrevPage} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        <ChevronLeftRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </IconButton>
      <IconButton onClick={handleNextPage} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        <ChevronRightRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </IconButton>
    </Box>
  );
};

export default SecondPageInputForm;
