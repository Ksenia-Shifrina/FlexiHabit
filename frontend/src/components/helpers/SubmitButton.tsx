import { Box, IconButton } from '@mui/material';

const SubmitButton: React.FC = () => {
  return (
    <IconButton
      type="submit"
      sx={{
        position: 'relative',
        display: 'inline-block',
        color: 'secondary.contrastText',
        fontSize: { xs: '1.2rem', sm: '1.4rem' },
        fontFamily: 'Kalam',
        borderRadius: '40px',
        p: '0.5rem',
        mb: '2rem',
        '&:hover': {
          borderRadius: '40px',
        },
      }}
    >
      <Box
        component="img"
        src="/images/circle.png"
        alt="Circle"
        sx={{
          position: 'absolute',
          width: '110%',
          height: '110%',
          top: -4,
          left: -3,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Box
        component="span"
        sx={{
          zIndex: 2,
          position: 'relative',
          fontFamily: 'Kalam, Arial, sans-serif',
          fontSize: '1.5rem',
          color: 'secondary.contrastText',
        }}
      >
        Save
      </Box>
    </IconButton>
  );
};

export default SubmitButton;
