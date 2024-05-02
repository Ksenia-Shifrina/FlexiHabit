import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export interface PageProps {
  displayNewPage: Function;
}

const FirstPageInputForm: React.FC<PageProps> = ({ displayNewPage }) => {
  const handleNextPage = () => {
    displayNewPage(1);
  };
  return (
    <Box sx={{}}>
      hey1
      <IconButton onClick={handleNextPage} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
        <ChevronRightRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
      </IconButton>
    </Box>
  );
};

export default FirstPageInputForm;
