import { Box, IconButton } from '@mui/material';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useNavigate } from 'react-router-dom';

const CloseFormButton: React.FC = () => {
  const navigate = useNavigate();
  return (
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
        sx={{ color: 'secondary.contrastText', fontSize: 'large', p: '0', mr: '2rem', mt: '2rem' }}
      >
        <HighlightOffRoundedIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.7rem' } }} />
      </IconButton>
    </Box>
  );
};

export default CloseFormButton;
