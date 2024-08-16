import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InputValuesFormat } from '../../types/inputTypes';
import { startingInputValues } from '../../helpers/inputHelpers';
import { createTargetDaysFromKeys, getTrueKeys, isValidTag } from '../../helpers/convertTypes';
import NameInput from './NameInput';
import ColorInput from './ColorInput';
import ColorPicker from './ColorPicker';
import TargetDaysInput from './TargetDaysInput';
import TagInput from './TagInput';
import { useFetchHabitDetails, useUpdateHabitDetails } from '../../hooks/habitApiHooks';
import StatementInput from './StatementInput';
import FrequencyInput from './FrequencyInput';
import SubmitButton from '../helpers/SubmitButton';
import DeleteButton from '../helpers/DeleteButton';
import CloseFormButton from '../helpers/CloseFormButton';

const EditHabitForm: React.FC = ({}) => {
  const navigate = useNavigate();
  const { habitId } = useParams();
  const [inputValues, setInputValues] = useState<InputValuesFormat>(startingInputValues);
  const [isColorPicker, setIsColorPicker] = useState<boolean>(false);

  const { habit: HabitData, fetchHabitDetails } = useFetchHabitDetails();
  const { updateHabitDetails } = useUpdateHabitDetails();

  React.useEffect(() => {
    if (habitId) {
      fetchHabitDetails(habitId);
    } else {
      navigate('/flexihabit/dashboard');
    }
  }, []);

  React.useEffect(() => {
    if (HabitData) {
      if (isValidTag(HabitData.habitTag)) {
        const targetDays = createTargetDaysFromKeys(HabitData.targetDaysDefault);
        setInputValues({
          nameValue: HabitData.habitName,
          colorValue: HabitData.habitColor,
          statementValue: HabitData.habitStatement,
          frequencyValue: HabitData.targetDaysDefault.length,
          targetDaysValue: targetDays,
          tagValue: HabitData.habitTag,
        });
      }
    }
  }, [HabitData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let targetDaysDefault: number[] = [];
    targetDaysDefault = getTrueKeys(inputValues.targetDaysValue);
    if (habitId) {
      updateHabitDetails(
        habitId,
        inputValues.nameValue,
        inputValues.colorValue,
        inputValues.statementValue,
        targetDaysDefault,
        inputValues.tagValue
      );
    } else {
      console.error('Missing habit id');
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
          justifyContent: 'flex-start',
          borderRadius: '10px',
          boxShadow: 1,
          width: { xs: '90%', sm: '40%' },
          height: 'auto',
          maxWidth: '2000px',
          // maxHeight: { xs: '95px', sm: '120px' },
          mt: { xs: '2rem', sm: '4rem' },
          mb: { xs: '1rem', sm: '4rem' },
        }}
      >
        <CloseFormButton />

        {!isColorPicker && (
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                mb: '2.5rem',
              }}
            >
              <NameInput nameValue={inputValues.nameValue} setInputValues={setInputValues} />
              <ColorInput colorValue={inputValues.colorValue} setIsColorPicker={setIsColorPicker} />
            </Box>

            <StatementInput statementValue={inputValues.statementValue} setInputValues={setInputValues} />
            <FrequencyInput frequencyValue={inputValues.frequencyValue} setInputValues={setInputValues} />
            <TargetDaysInput targetDaysValue={inputValues.targetDaysValue} setInputValues={setInputValues} />
            <TagInput tagValue={inputValues.tagValue} setInputValues={setInputValues} />
            {habitId && (
              <Grid
                container
                gap="0.5rem"
                sx={{ direction: 'row', justifyContent: 'center', mt: '1rem', mb: '1.5rem' }}
              >
                <DeleteButton habitId={habitId} />
                <SubmitButton />
              </Grid>
            )}
          </Box>
        )}

        {isColorPicker && <ColorPicker setIsColorPicker={setIsColorPicker} setInputValues={setInputValues} />}
      </Box>
    </Box>
  );
};

export default EditHabitForm;
