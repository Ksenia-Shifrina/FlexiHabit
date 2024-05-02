import { Box, FormControl } from '@mui/material';
import React, { useState } from 'react';
import FirstPageInputForm from './FirstPageInputForm';
import SecondPageInputForm from './SecondPageInputForm';
import ThirdPageInputForm from './ThirdPageInputForm';

const NewHabitForm: React.FC = () => {
  const [displayedPage, setDisplayedPage] = useState<number>(1);

  const displayNewPage = (i: number) => {
    setDisplayedPage((prevState) => prevState + i);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        // height: '100%',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'primary.main',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          boxShadow: 1,
          width: { xs: '90%', sm: '80%' },
          height: { xs: '35rem', sm: '40rem' },
          maxWidth: '2000px',
          // maxHeight: { xs: '95px', sm: '120px' },
          mt: { xs: '2rem', sm: '4rem' },
        }}
      >
        <FormControl>
          {displayedPage === 1 && <FirstPageInputForm displayNewPage={displayNewPage} />}
          {displayedPage === 2 && <SecondPageInputForm displayNewPage={displayNewPage} />}
          {displayedPage === 3 && <ThirdPageInputForm displayNewPage={displayNewPage} />}
        </FormControl>
      </Box>
    </Box>
  );
};

export default NewHabitForm;
