import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { InputValuesFormat } from '../../types/inputTypes';
import { startingInputValues, validTags } from '../../helpers/inputHelpers';
import { createTargetDaysFromKeys, getTrueKeys, isValidTag } from '../../helpers/convertTypes';
import NameInput from './NameInput';
import ColorInput from './ColorInput';
import ColorPicker from './ColorPicker';
import StatementAndFrequencyInputs from './StatementAndFrequencyInputs';
import TargetDaysInput from './TargetDaysInput';
import TagInput from './TagInput';
import { useDeleteHabit, useFetchHabitDetails, useUpdateHabitDetails } from '../../hooks/habitApiHooks';

const EditHabitForm: React.FC = ({}) => {
  const navigate = useNavigate();
  const { habitId } = useParams();
  const [inputValues, setInputValues] = useState<InputValuesFormat>(startingInputValues);
  const [isColorPicker, setIsColorPicker] = useState<boolean>(false);

  const { habit: HabitData, fetchHabitDetails: fetchHabitDetails } = useFetchHabitDetails();
  const { updateHabitDetails: updateHabitDetails } = useUpdateHabitDetails();
  const { deleteHabit: deleteHabit } = useDeleteHabit();

  React.useEffect(() => {
    if (habitId) {
      fetchHabitDetails(habitId);
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
    const habitTargetDays = inputValues?.targetDaysValue;
    let targetDaysDefault: number[] = [];
    if (habitTargetDays) {
      targetDaysDefault = getTrueKeys(habitTargetDays);
    }
    if (habitId) {
      updateHabitDetails(
        habitId,
        inputValues.nameValue,
        inputValues.colorValue,
        inputValues.statementValue,
        targetDaysDefault,
        inputValues.tagValue
      );
    }

    // const formData = new FormData(event.currentTarget);
    // const habitName = formData.get('habitName');
    // const habitColor = formData.get('habitColor');
    // const habitStatement = formData.get('habitStatement');
    // const habitTag = formData.get('habitTag');
    // if (
    //   typeof habitName === 'string' &&
    //   typeof habitColor === 'string' &&
    //   typeof habitStatement === 'string' &&
    //   typeof habitTag === 'string'
    // ) {
    //   updateHabitDetails(habitName, habitColor, habitStatement, targetDaysDefault, habitTag);
    // } else {
    //   console.error('Form data type error');
    // }
    navigate('/flexihabit/dashboard');
  };

  const handleDelete = () => {
    if (habitId) {
      deleteHabit(habitId);
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
          height: { xs: '70rem', sm: '70rem' },
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
        {!isColorPicker && (
          <Box>
            <NameInput nameValue={inputValues.nameValue} setInputValues={setInputValues} />
            <ColorInput colorValue={inputValues.colorValue} setIsColorPicker={setIsColorPicker} />
            <StatementAndFrequencyInputs
              statementValue={inputValues.statementValue}
              frequencyValue={inputValues.frequencyValue}
              setInputValues={setInputValues}
            />
            <TargetDaysInput targetDaysValue={inputValues.targetDaysValue} setInputValues={setInputValues} />
            <TagInput tagValue={inputValues.tagValue} setInputValues={setInputValues} />
            <IconButton type="submit" sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
              Save
            </IconButton>
            <IconButton onClick={handleDelete} sx={{ color: 'primary.contrastText', fontSize: 'large', p: '0' }}>
              Delete
            </IconButton>
          </Box>
        )}

        {isColorPicker && <ColorPicker setIsColorPicker={setIsColorPicker} setInputValues={setInputValues} />}
      </Box>
    </Box>
  );
};

export default EditHabitForm;
