import { Grid, IconButton } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export interface ChangePageButtonProps {
  displayNewPage: Function;
  direction: number;
}

const ChangePageButton: React.FC<ChangePageButtonProps> = ({ displayNewPage, direction }) => {
  const buttonStyle = { color: 'secondary.contrastText', fontSize: { xs: '1.2rem', sm: '1.4rem' } };
  const divStyle = { display: 'flex', alignItems: 'center', fontFamily: 'Kalam' };

  return (
    <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
      <IconButton
        onClick={() => displayNewPage(direction)}
        sx={{
          color: 'secondary.contrastText',
          fontSize: { xs: '1.2rem', sm: '1.4rem' },
          mb: '2rem',
          borderRadius: '10px',
          '&:hover': {
            borderRadius: '10px',
          },
        }}
      >
        {direction == -1 ? (
          <div style={divStyle}>
            <ChevronLeftRoundedIcon sx={buttonStyle} />
            Back&nbsp;
          </div>
        ) : (
          <div style={divStyle}>
            &nbsp;Next
            <ChevronRightRoundedIcon sx={buttonStyle} />
          </div>
        )}
      </IconButton>
    </Grid>
  );
};

export default ChangePageButton;
