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
import { getTrueKeys } from '../../helpers/convertTypes';

const CreateHabitForm: React.FC = ({}) => {
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
    const habitStatement = formData.get('habitStatement');
    const habitTag = formData.get('habitTag');
    const habitTargetDays = inputValues.targetDaysValue;
    let targetDaysDefault: number[] = [];
    if (habitTargetDays) {
      targetDaysDefault = getTrueKeys(habitTargetDays);
    }
    if (
      typeof habitName === 'string' &&
      typeof habitColor === 'string' &&
      typeof habitStatement === 'string' &&
      typeof habitTag === 'string'
    ) {
      createHabit(habitName, habitColor, habitStatement, targetDaysDefault, habitTag);
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
          height: { xs: 'auto', sm: 'auto' },
          maxWidth: '2000px',
          // maxHeight: { xs: '95px', sm: '120px' },
          mt: { xs: '2rem', sm: '4rem' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            onClick={() => navigate('/flexihabit/dashboard')}
            sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0', mr: 7 }}
          >
            <HighlightOffRoundedIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
          </IconButton>
        </Box>
        <div
          style={{
            visibility: displayedPage === 1 ? 'visible' : 'hidden',
            position: displayedPage === 1 ? 'static' : 'absolute',
          }}
        >
          <FirstPageInputForm
            displayNewPage={displayNewPage}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div
          style={{
            visibility: displayedPage === 2 ? 'visible' : 'hidden',
            position: displayedPage === 2 ? 'static' : 'absolute',
          }}
        >
          <SecondPageInputForm
            displayNewPage={displayNewPage}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div
          style={{
            visibility: displayedPage === 3 ? 'visible' : 'hidden',
            position: displayedPage === 3 ? 'static' : 'absolute',
          }}
        >
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

export default CreateHabitForm;
