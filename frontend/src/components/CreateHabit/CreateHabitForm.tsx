import { Box } from '@mui/material';
import React, { useState } from 'react';
import FirstPageInputForm from './FirstPageInputForm/FirstPageInputForm';
import SecondPageInputForm from './SecondPageInputForm/SecondPageInputForm';
import ThirdPageInputForm from './ThirdPageInputForm/ThirdPageInputForm';
import { useNavigate } from 'react-router-dom';
import { useCreateNewHabit } from '../../hooks/habitApiHooks';
import { InputValuesFormat } from '../../types/inputTypes';
import { startingInputValues } from '../../helpers/inputHelpers';
import { getTrueKeys } from '../../helpers/convertTypes';
import CloseFormButton from '../helpers/CloseFormButton';
import PageWrapper from '../helpers/PageWrapper';

const CreateHabitForm: React.FC = ({}) => {
  const navigate = useNavigate();
  const [displayedPage, setDisplayedPage] = useState<number>(1);
  const [inputValues, setInputValues] = useState<InputValuesFormat>(startingInputValues);

  const displayNewPage = (i: number) => {
    setDisplayedPage((prevState) => prevState + i);
  };

  const { createHabit } = useCreateNewHabit();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let targetDaysDefault: number[] = [];
    targetDaysDefault = getTrueKeys(inputValues.targetDaysValue);
    createHabit(
      inputValues.nameValue,
      inputValues.colorValue,
      inputValues.statementValue,
      targetDaysDefault,
      inputValues.tagValue
    );
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
          justifyContent: 'space-around',
          borderRadius: '10px',
          boxShadow: 1,
          width: { xs: '90%', sm: '40%' },
          maxWidth: '2000px',
          height: { xs: '300px', sm: '500px' },
          mt: { xs: '2rem', sm: '4rem' },
        }}
      >
        <CloseFormButton />

        <PageWrapper displayedPage={displayedPage} num={1}>
          <FirstPageInputForm
            displayNewPage={displayNewPage}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </PageWrapper>

        <PageWrapper displayedPage={displayedPage} num={2}>
          <SecondPageInputForm
            displayNewPage={displayNewPage}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </PageWrapper>

        <PageWrapper displayedPage={displayedPage} num={3}>
          <ThirdPageInputForm
            displayNewPage={displayNewPage}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </PageWrapper>
      </Box>
    </Box>
  );
};

export default CreateHabitForm;
