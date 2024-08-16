import { Grid } from '@mui/material';
import React from 'react';
import { PagesNewHabitFormProps } from '../FirstPageInputForm/FirstPageInputForm';
import ChangePageButton from '../../helpers/ChangePageButton';
import { CustomTypography } from '../../helpers/CustomTypography';
import SubmitButton from '../../helpers/SubmitButton';
import TagInput from './TagInput';
import PageContentWrapper from '../../helpers/PageContentWrapper';

const ThirdPageInputForm: React.FC<PagesNewHabitFormProps> = ({ displayNewPage, inputValues, setInputValues }) => {
  return (
    <PageContentWrapper>
      <CustomTypography
        variant="h1"
        sx={{ fontSize: '1.5rem', mt: '2rem', mb: '1.5rem', color: 'secondary.contrastText', lineHeight: 1.5 }}
      >
        <span style={{ textDecoration: 'wavy underline' }}> Balancing</span> my life <br /> helps me reach my{' '}
        <span style={{ textDecoration: 'dotted underline' }}>goals</span>
        <br />
        and feel truly fulfilled.
      </CustomTypography>

      <CustomTypography variant="h1" sx={{ fontSize: '1.5rem', mb: '2rem', color: 'secondary.contrastText' }}>
        Developing this habit will positively impact my
      </CustomTypography>

      <TagInput tagValue={inputValues.tagValue} setInputValues={setInputValues} />

      <Grid container gap="0.5rem" sx={{ direction: 'row', justifyContent: 'center' }}>
        <ChangePageButton displayNewPage={displayNewPage} direction={-1} />
        <SubmitButton />
      </Grid>
    </PageContentWrapper>
  );
};

export default ThirdPageInputForm;
