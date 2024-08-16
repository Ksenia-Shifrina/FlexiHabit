import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { PagesNewHabitFormProps } from '../FirstPageInputForm/FirstPageInputForm';
import TargetDaysInput from './TargetDaysInput';
import StatementInput from './StatementInput';
import FrequencyInput from './FrequencyInput';
import ChangePageButton from '../../helpers/ChangePageButton';
import PageContentWrapper from '../../helpers/PageContentWrapper';

const SecondPageInputForm: React.FC<PagesNewHabitFormProps> = ({ displayNewPage, inputValues, setInputValues }) => {
  const [isShortStatement, setIsShortStatement] = useState<boolean>(true);

  return (
    <PageContentWrapper>
      <StatementInput
        statementValue={inputValues.statementValue}
        setInputValues={setInputValues}
        isShortStatement={isShortStatement}
        setIsShortStatement={setIsShortStatement}
      />
      <FrequencyInput
        frequencyValue={inputValues.frequencyValue}
        setInputValues={setInputValues}
        isShortStatement={isShortStatement}
      />
      <TargetDaysInput
        targetDaysValue={inputValues.targetDaysValue}
        setInputValues={setInputValues}
        isShortStatement={isShortStatement}
      />

      <Grid container gap="0.5rem" sx={{ direction: 'row', justifyContent: 'center' }}>
        <ChangePageButton displayNewPage={displayNewPage} direction={-1} />
        <ChangePageButton displayNewPage={displayNewPage} direction={1} />
      </Grid>
    </PageContentWrapper>
  );
};

export default SecondPageInputForm;
