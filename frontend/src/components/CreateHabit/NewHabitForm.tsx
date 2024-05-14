import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import FirstPageInputForm from './FirstPageInputForm/FirstPageInputForm';
import SecondPageInputForm from './SecondPageInputForm/SecondPageInputForm';
import ThirdPageInputForm from './ThirdPageInputForm/ThirdPageInputForm';
import { useNavigate } from 'react-router-dom';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useCreateNewHabit } from '../../hooks/habitApiHooks';
import { InputValuesFormat } from '../../types/inputTypes';
import { startingInputValues } from '../../helpers/inputHelpers';

const NewHabitForm: React.FC = ({}) => {
  const navigate = useNavigate();
  const [displayedPage, setDisplayedPage] = useState<number>(1);
  const [inputValues, setInputValues] = useState<InputValuesFormat>(startingInputValues);

  const displayNewPage = (i: number) => {
    setDisplayedPage((prevState) => prevState + i);
  };

  const { createHabit: createHabit } = useCreateNewHabit();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const habitName = formData.get('habitName');
    const habitColor = formData.get('habitColor');
    const habitActivity = formData.get('habitActivity');
    const habitTargetDays = formData.get('habitTargetDays');
    const habitTag = formData.get('habitTag');
    if (
      typeof habitName === 'string' &&
      typeof habitColor === 'string' &&
      typeof habitActivity === 'string' &&
      Array.isArray(habitTargetDays) &&
      typeof habitTag === 'string'
    ) {
      createHabit(habitName, habitColor, habitActivity, habitTargetDays, habitTag);
    } else {
      console.error('Form data type error');
    }
    navigate('/flexihabit/dashboard');
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
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
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
        <IconButton
          onClick={() => navigate('/flexihabit/dashboard')}
          sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}
        >
          <HighlightOffRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
        </IconButton>
        <div style={{ display: displayedPage === 1 ? 'block' : 'none' }}>
          <FirstPageInputForm
            displayNewPage={displayNewPage}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div style={{ display: displayedPage === 2 ? 'block' : 'none' }}>
          <SecondPageInputForm
            displayNewPage={displayNewPage}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div style={{ display: displayedPage === 3 ? 'block' : 'none' }}>
          <ThirdPageInputForm
            displayNewPage={displayNewPage}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
      </Box>
    </Box>
  );
};

export default NewHabitForm;
